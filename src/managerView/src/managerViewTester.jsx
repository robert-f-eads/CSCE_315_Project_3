import { translateText } from "../../databaseConnections/managerViewFunctions";
import ManagerHome from "./managerHome";

function ManagerViewTester(props) {
  const {userData, language} = props;
  return (
    <>
      <ManagerHome userData={userData} language={language}/>
    </>
  );
}

export default ManagerViewTester;