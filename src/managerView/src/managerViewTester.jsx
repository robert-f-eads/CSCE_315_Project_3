import { translateText } from "../../databaseConnections/managerViewFunctions";
import ManagerHome from "./managerHome";

/**
 * @param {*} props data to use in display
 * @returns a container for the manager view
 */
function ManagerViewTester(props) {
  const {userData, language} = props;
  return (
    <>
      <ManagerHome userData={userData} language={language}/>
    </>
  );
}

export default ManagerViewTester;