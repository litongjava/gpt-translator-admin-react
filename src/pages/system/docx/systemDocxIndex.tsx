import React from 'react';
import {
  batchRemoveSystemDocx,
  createSystemDocx,
  exportAllSystemDocx,
  exportSystemDocx,
  pageSystemDocx,
  removeSystemDocx
} from './systemDocxService';
import ProDataTable from "@/components/common/ProDataTable";
import {customUploadToTencent} from "@/services/system/systemService";
import UploadFileItem from "@/components/common/UploadFileItem";
import {UploadProps} from "antd/lib/upload/interface";
import {systemDocxColumns} from "@/pages/system/docx/systemDocxColumn";
import {useNavigate} from "@@/exports";


const SystemDocxManagement: React.FC = () => {
  let navigate = useNavigate();

  const [fileList, setFileList] = React.useState<any[]>([]);

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setFileList(newFileList);
  }


  const onFormVisibleChange = (visible: boolean, currentRow: any) => {
    if (visible) {
      if (currentRow && currentRow.urls) {
        setFileList(currentRow.urls);
      } else {
        setFileList([]);
      }
    }
  }

  const beforeCreateRequest = (params: any) => {

    // 提取上传组件的数据
    // {uid: '-1', name: 'xxx.png', status: 'done', url: 'http://www.baidu.com/xxx.png'}

    params.urls = fileList.map((file: any) => {
      console.log("file:", file);
      return {
        uid: file.uid,
        name: file.name,
        status: file.status,
        size: file.size,
        type: file.type,
        id: file.id || file.response?.data.id,
        url: file.url || file.response?.data.url
      }
    });

    params.id_type = "long";
    // params.urls_type = 'string[]';
    params.json_fields_type = 'string[]';
    params.json_fields = ["urls"];
    return params;
  }


  const beforePageRequest = (params: any) => {
    params.idType = 'long';
    params.deleted = 0
    params.json_fields_type = 'string[]';
    params.json_fields = ["urls"];
    params.orderBy = 'version';
    params.isAsc = 'false';
    return params;
  }


  const secondaryOptions = {
    title: 'Edit',
    valueType: 'option',
    width: 200,
    render: (text: any, record: any) => [
      <a key="preView" onClick={() => navigate("/docx/" + record.id, {replace: true})}>
        Preview
      </a>,
    ],
  };


  const columns = [...systemDocxColumns(), secondaryOptions];

  return (
    <ProDataTable columns={columns} createRequest={createSystemDocx} deleteRequest={removeSystemDocx}
                  batchRemoveRequest={batchRemoveSystemDocx}
                  pageRequest={pageSystemDocx}
                  exportRequest={exportSystemDocx}
                  exportAllRequest={exportAllSystemDocx}
                  beforePageRequest={beforePageRequest}
                  beforeCreateRequest={beforeCreateRequest}
                  onFormVisibleChange={onFormVisibleChange}>

      <UploadFileItem label="Files" max={1} name="urls" fileList={fileList} onChange={handleChange}
                      customRequest={customUploadToTencent}/>
      <div>
        {fileList.map((file) => {
          return <div key={file.id || file.response?.data.id}>{file.url || file.response?.data.url}</div>
        })}
      </div>
    </ProDataTable>

  );
};

export default SystemDocxManagement;
