export const beforeDocumentPageRequest = (params: any, isRecoveryMode?: boolean, containsUpload?: boolean) => {
  params.idType = 'long';
  params.orderBy = "name";
  if (containsUpload) {
    params.json_fields = ["files"];
  }

  if (isRecoveryMode) {
    params.deleted = 1
  } else {
    params.deleted = 0
  }
  return params;
}
export const beforeDocumentCreateRequest = (formValues: any) => {
  return {
    ...formValues,
    idType: 'long',
  };
}
