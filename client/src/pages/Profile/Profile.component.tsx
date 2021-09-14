import { Link, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CreateUpdateProfile from "../../components/create-update-profile/CreateUpdateProfile.component";
import Wrapper from "../../components/Wrapper";
import "./Profile.styles.css";
import LeftNavigation from "../../components/left-navigation/LeftNavigation.component";

export interface ProfileProps {}

export const PROFILE = gql`
  {
    me {
      id
      Profile {
        id
        bio
        location
        website
        avatar
      }
    }
  }
`;

const Profile: React.FC<ProfileProps> = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(PROFILE);

  return (
    <Wrapper loading={loading} error={error}>
      <div className="primary">
        <div className="left">
          <LeftNavigation />
        </div>
        <div className="profile">
          <div className="profile-info">
            <div className="profile-head">
              <span className="back-arrow" onClick={() => history.goBack()}>
                <i className="fa fa-arrow-left" aria-hidden={true}></i>
              </span>
              <span className="nickname">
                <h3>{data?.me.name}</h3>
              </span>
            </div>
            <div className="avatar">
              {data?.me.Profile.avatar ? (
                <img
                  src={data?.me.Profile.avatar}
                  style={{ width: "150px", borderRadius: "50%" }}
                  alt="avatar"
                />
              ) : (
                <i className="fa fa-user fa-5x" aria-hidden={true}></i>
              )}
            </div>
            <div className="make-profile">
              <CreateUpdateProfile profile={data?.me.Profile} />
            </div>
            <h3 className="name">{data?.me.name}</h3>

            {data?.me.Profile.id && (
              <p>
                <i className="fas fa-link"></i>
                <Link
                  to={{ pathname: `http://${data?.me.Profile.website}` }}
                  target="_blank"
                >
                  {data?.me.Profile.website}
                </Link>
              </p>
            )}

            <div className="followers">
              <p>200 following</p>
              <p>354 followers</p>
            </div>
          </div>
        </div>
        <div className="right">Right</div>
      </div>
    </Wrapper>
  );
};

export default Profile;
