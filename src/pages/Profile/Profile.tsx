import { useArticles, useProfile } from "hooks";
import { ArticlePreview } from "components/ArticlePreview";
import { useLocation } from "react-router-dom";
import { getMockedFullName } from "utils/helpers";
import placeholder from "../../assets/placeholder.jpg";
import axios from "axios";

export const Profile: React.FC = () => {
  const location = useLocation();
  const username = location.pathname.replace("/profile/", "");
  const profile = useProfile(username);
  const { articles } = useArticles({ author: profile?.username });

  // @TODO: no full name in response, so lets mock it
  const profileName = getMockedFullName(profile?.username);
  const authorImage = profile?.image || placeholder;

  const handleFollow = async () => {
    const followURL = `api/profiles/${profile?.username}/follow`;
    if (profile?.following) {
      await axios.delete(followURL);
    } else {
      await axios.post(followURL);
    }
    window.dispatchEvent(new Event("favorited"));
  };

  const followBtnClassName = [
    "btn btn-sm action-btn",
    profile?.following ? "btn-secondary favorited" : "btn-outline-secondary",
  ].join(" ");

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={authorImage} className="user-img" />
                <h4>{profileName}</h4>
                <p>{profile?.bio}</p>
                <button className={followBtnClassName} onClick={() => handleFollow()}>
                  {profile?.following ? (
                    <>
                      <i className="ion-android-done" />
                      &nbsp; Following {profileName}
                    </>
                  ) : (
                    <>
                      <i className="ion-plus-round" />
                      &nbsp; Follow {profileName}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {articles.map(article => (
                <ArticlePreview key={article.createdAt} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
