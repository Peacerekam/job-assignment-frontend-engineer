import "./style.scss";

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
