# LAB - Class 16

## Project: image-lambda

### Author: Jelani R

### Problem Domain

AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We’ll use it today to automatically run some processing on image files after they’re uploaded to an S3 Bucket.

### Links and Resources

- [GitHub Actions ci/cd](https://github.com/Jchips/image-lambda/actions)
- [Pull Request](https://github.com/Jchips/image-lambda/pull/1)
- [images.json](https://lab-17.s3.us-west-2.amazonaws.com/images.json)

### Setup

#### `.env` requirements

- N/A

#### Description of how to use my lambda

Upload image to AWS S3 bucket. This will add the image metadata to an array with any other images added.

#### Features / Routes

What was my key takeaway?

- My key takeaway is learning what lambdas are and how to implement AWS lambdas.
- The issues I encountered when deploying my lambda were:
  1. the `images.json` file only storing one image object even after uploading multiple images. It was creating an empty array every time the lambda was triggered and then storing that newly uploaded image into it. I solved this by specifically getting the `images.json` file with `Key: 'images.json'` in the `S3:getObject`.
  2. getting an AccessDenied error when uploading the first image because the images.json wasn't already created. I solved this issue by creating a conditional for if I got the AccessDenied error when trying to read the `images.json` file.

Pull requests:

- <https://github.com/Jchips/image-lambda/pull/1>

#### Tests

- N/A
