import React from "react";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";

//import { storage } from "../../modules/fire";

export default function TableImage(props) {
  const { imageURL } = props;
  //const [src, setSrc] = useState("");
  // const storageRef = storage.ref();

  // useEffect(() => {
  //   storageRef
  //     .child(imageURL)
  //     .getDownloadURL()
  //     .then((url) => {
  //       console.log(url);
  //       setSrc(url);
  //     });
  // }, [imageURL, storageRef]);

  return <Avatar variant="rounded" src={imageURL} alt="table image" />;
}

TableImage.propTypes = {
  imageURL: PropTypes.string.isRequired,
};
