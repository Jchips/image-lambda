const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
  console.log(event); // delete later

  let Bucket = event.Records[0].s3.bucket.name;
  let Key = event.Records[0].s3.object.key;
  console.log(Bucket, Key); // delete later

  try {
    let imagesArray;
    try {
      let imagesJson = await S3.getObject({ Bucket, Key: 'images.json' }).promise();
      console.log('imagesJson', imagesJson); // delete later
      imagesArray = JSON.parse(imagesJson.Body.toString());
    } catch (error) {
      if (error.code === 'AccessDenied') {
        imagesArray = [];
      } else {
        throw error;
      }
    }

    console.log('imagesArray', imagesArray); // delete later

    let metadata = {
      name: Key,
      size: event.Records[0].s3.object.size,
      type: 'jpg',
    };

    const duplicate = imagesArray.findIndex(image => {
      return image.name === metadata.name;
    });

    if (duplicate === -1) {
      imagesArray.push(metadata);
    } else {
      imagesArray[duplicate] = metadata;
    }

    await S3.putObject({ Bucket, Key: 'images.json', Body: JSON.stringify(imagesArray) }).promise();

    console.log('result:', JSON.stringify(imagesArray));

    return {
      statusCode: 200,
      body: JSON.stringify('success'),
    };

  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify('error'),
    };
  }
};
