function Avatar(props) {
  const fileName = props.profileImage.split("/").pop().split(".")[0];

  const capitalizedName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

  const altText = `${capitalizedName}'s profile image`;

  // console.log(capitalizedName);

  return (
    <>
      <img className="avatar" src={props.profileImage} alt={altText} />
    </>
  );
}

export default Avatar;
