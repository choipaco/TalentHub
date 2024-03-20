export const S3QbjectDelete = (url: string) => {
    const defaultUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_AWS_REGION}.amazonaws.com/`;
    const defaultUrl2 = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`;
    let res = url.replace(defaultUrl,'');
    res = res.replace(defaultUrl2,'');
    res = decodeURIComponent(res);

    return res;
}