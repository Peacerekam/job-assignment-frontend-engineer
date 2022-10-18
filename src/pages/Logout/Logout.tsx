export const Logout: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h2 className="text-xs-center">You have succesfully logged out</h2>
              <p style={{ textAlign: "center" }}>
                Click <a href="/#/">here</a> to go back to main page
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
