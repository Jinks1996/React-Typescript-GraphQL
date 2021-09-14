import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PROFILE } from "../../pages/Profile/Profile.component";
import "./CreateTweet.styles.css";
import Modal from "../modal/Modal.component";

interface CreateTweetProps {}

const CREATE_TWEET = gql`
  mutation createTweet($content: String) {
    createTweet(content: $content) {
      id
    }
  }
`;

const CreateTweet: React.FC<CreateTweetProps> = (props) => {
  const [createTweet] = useMutation(CREATE_TWEET, {
    refetchQueries: [{ query: PROFILE }],
  });

  const [modalState, setModalState] = useState<boolean>(false);

  const initialValues: { content: string } = {
    content: "",
  };

  const validationSchema = Yup.object({
    content: Yup.string()
      .max(256, "character limit exceeded")
      .required("required"),
  });

  return (
    <Modal
      modalState={modalState}
      updateModalState={() => setModalState(!modalState)}
      modalButton={true}
      modalButtonText={"Tweet"}
      shouldCloseOnOverlayClick={true}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await createTweet({ variables: values });

          setSubmitting(false);
          setModalState(false);
        }}
      >
        <Form>
          <Field
            name="content"
            type="text"
            as="textarea"
            placeholder="What's happening ..."
          />
          <ErrorMessage name="content" component={"div"} />

          <div className="footer"></div>
          <button className="tweet-button" type="submit">
            <span>Tweet</span>
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateTweet;
