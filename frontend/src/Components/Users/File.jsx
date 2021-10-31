/* import { useState } from "react";

export default  uploadFile = async (
  url,
  file,
  callback,
  token = "",
  onError = () => {},
  onCommunicationError = () => {}
) => {
  try {
    const data = new FormData();
    data.append("image", file);
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      const body = await response.json();

      callback(body);
      // respuesta correcta, hacer algo con body
    } else {
      onError(response);
      console.log("Codigo de estado no esperado", response.status, response.statusText);
      // respuesta erronea, informar al usuario?
    }
  } catch (msg) {
    onCommunicationError(msg);
    // fallo de comunicación, informar al usuario?
    console.error("Errorísimo!!!!", msg);
  }
};

const Upload = (props) => {
  const [file, setFile] = useState();
  const [serverImg, setServerImg] = useState("");
  console.log("file:", file);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = (jsonResponse) => {
      console.log(jsonResponse);
      setServerImg(jsonResponse.filename);
    };
    uploadFile("http://192.168.5.103:3050/files", file, onSuccess);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select file to upload</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {serverImg && <img src={`http://192.168.5.103:3050/${serverImg}`} alt="server avatar" />}
    </div>
  );
};

export default Upload;
 */
