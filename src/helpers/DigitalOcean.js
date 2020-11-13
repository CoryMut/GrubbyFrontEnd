import AWS from "aws-sdk";

/**
 * Digital Ocean Spaces Connection
 */

const upload = (file, folder) => {
    const spacesEndpoint = new AWS.Endpoint("sfo2.digitaloceanspaces.com");
    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: "EIQCWJ3QXAGCT2ZR3RAJ",
        secretAccessKey: "LQzNnHFBgwTCXSCfvRjHbU19W2Gc1LJEbjR766cqFDE",
    });

    const bucketName = "grubbythegrape";
    let digitalOceanSpaces = "https://grubbythegrape.sfo2.digitaloceanspaces.com/";
    const blob = file;
    const params = { Body: blob, Bucket: `${bucketName}`, Key: `${folder}/${blob.name}` };

    // Sending the file to the Spaces
    s3.putObject(params)
        .on("build", (request) => {
            request.httpRequest.headers.Host = `${digitalOceanSpaces}`;
            request.httpRequest.headers["Content-Length"] = blob.size;
            request.httpRequest.headers["Content-Type"] = blob.type;
            request.httpRequest.headers["x-amz-acl"] = "public-read";
        })
        .send((error) => {
            if (error) console.log(error);
            else {
                // If there is no error updating the editor with the imageUrl
                // const imageUrl = `${digitalOceanSpaces}/` + blob.name;
                // console.log(imageUrl);
                return;
            }
        });
};

export default upload;
