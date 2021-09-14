import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { PROFILE } from "../../pages/Profile/Profile.component";
import "./CreateUpdateProfile.styles.css";
import Wrapper from "../Wrapper";
import Modal from "../modal/Modal.component";

interface CreateUpdateProfileProps {
  profile?: {
    id?: number;
    bio: string;
    location: string;
    website: string;
    avatar: string;
  };
}

const defaultProps = {
  profile: {
    bio: "",
    location: "",
    website: "",
    avatar: "",
  },
};

const CREATE_PROFILE = gql`
  mutation createProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: Int
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      id: $id
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;
interface ImageState {
  image: string;
  loading: boolean;
}

const CreateUpdateProfile: React.FC<
  CreateUpdateProfileProps & typeof defaultProps
> = (props) => {
  let CREATE_OR_UPDATE_PROFILE = props.profile.id
    ? CREATE_PROFILE
    : UPDATE_PROFILE;

  const [createOrUpdateProfile] = useMutation(CREATE_OR_UPDATE_PROFILE, {
    refetchQueries: [{ query: PROFILE }],
  });

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    image: "",
    loading: false,
  });
  const [modalState, setModalState] = useState<boolean>(true);

  useEffect(() => {
    if (props.profile.id) {
      setModalState(false);
    }
  }, []);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files ? files[0] : "");
    data.append("upload_preset", "ml_default");

    setImageState({ ...imageState, loading: true });
    const response = await fetch(
      `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await response.json();
    console.log("==>", file);
    setImageState({
      image: file.secure_url,
      loading: false,
    });
  };

  const initialValues = {
    bio: props.profile.bio,
    location: props.profile.location,
    website: props.profile.website,
    avatar: props.profile.avatar,
  };

  return (
    <Modal
      modalState={modalState}
      updateModalState={() => setModalState(!modalState)}
      modalButton={props.profile.id ? true : false}
      modalButtonText={"Edit Profile"}
      shouldCloseOnOverlayClick={props.profile.id ? true : false}
    >
      <input
        type="file"
        name="file"
        placeholder="Upload file"
        onChange={handleUpload}
        ref={inputFile}
        style={{ display: "none" }}
      />

      <Wrapper loading={imageState.loading} error={undefined}>
        <span onClick={() => inputFile.current?.click()}>
          {imageState.image ? (
            <img
              src={imageState.image}
              style={{ width: "150px", borderRadius: "50%" }}
              alt="avatar"
            />
          ) : (
            <i className="fa fa-user fa-5x" aria-hidden={true}></i>
          )}
        </span>
      </Wrapper>

      <Formik
        initialValues={initialValues}
        //  validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await createOrUpdateProfile({
            variables: { ...values, avatar: imageState.image },
          });

          setSubmitting(false);
          setModalState(false);
        }}
      >
        <Form>
          <Field name="bio" type="text" as="textarea" placeholder="Bio" />
          <ErrorMessage name="bio" component={"div"} />
          <Field name="location" type="location" placeholder="Location" />
          <ErrorMessage name="location" component={"div"} />
          <Field name="website" type="website" placeholder="Website" />
          <ErrorMessage name="website" component={"div"} />
          <button className="login-button" type="submit">
            <span>
              {props.profile.id ? "Update Profile" : "Create Profile"}
            </span>
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

CreateUpdateProfile.defaultProps = defaultProps;
export default CreateUpdateProfile;
