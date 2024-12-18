import React, { useState } from 'react';
import { max_kb_document_translate_columns } from "@/pages/website/document/documentColumn";
import ApiTableLong from "@/components/common/ApiTableLong";
import { beforeDocumentCreateRequest, beforeDocumentPageRequest } from "@/pages/website/document/documentService";
import { message } from "antd";
import { request } from "@umijs/max";
import appConfig from "../../../../config/appConfig";

export default () => {
  const from = "max_kb_document_translate";

  const [messageApi, contextHolder] = message.useMessage();
  const [tableKey, setTableKey] = useState(Date.now()); // 用于强制刷新表格

  // 翻译请求函数
  const onClickRequest = async (id: string) => {
    const hide = messageApi.loading('Translating...', 0); // 设置持续时间为 0，直到手动关闭
    try {
      const respVo = await request<API.Result>(`${appConfig.baseURL}/api/document/translate/${id}`, { method: 'GET' });
      hide(); // 手动关闭加载提示
      if (respVo.ok) {
        messageApi.success('Translation task submit successfully!');
        setTableKey(Date.now());
      } else {
        messageApi.error(respVo.msg || 'Translation failed. Please try again.');
      }
    } catch (error) {
      hide();
      messageApi.error(`Error: ${error || 'Unexpected error occurred.'}`);
    }
  };

  const exportDstContentRequest = async (id: string) => {
    const hide = messageApi.loading('Exporting...', 0);
    try {
      const url = `${appConfig.baseURL}/api/document/export/${id}`;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      hide();
      messageApi.success('Export completed successfully!');
      setTableKey(Date.now());
    } catch (error) {
      hide();
      messageApi.error(`Error: ${error || 'Unexpected error occurred.'}`);
    }
  };

  const exportSrcContentRequest = async (id: string) => {
    const hide = messageApi.loading('Exporting...', 0);
    try {
      const url = `${appConfig.baseURL}/api/document/export/src/${id}`;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      hide();
      messageApi.success('Export completed successfully!');
      setTableKey(Date.now());
    } catch (error) {
      hide();
      messageApi.error(`Error: ${error || 'Unexpected error occurred.'}`);
    }
  };

  // 定义操作列
  const editContentAndPreview = {
    title: 'Buttons',
    valueType: 'option',
    width: 200,
    render: (text: any, record: { id: string }) => [
      <a
        key={`translate-${record.id}`}
        onClick={() => onClickRequest(record.id)}
      >
        Translate
      </a>,
      <a
        key={`export-src-${record.id}`}
        onClick={() => exportSrcContentRequest(record.id)}
      >
        Export Src
      </a>,
      <a
        key={`export-dst-${record.id}`}
        onClick={() => exportDstContentRequest(record.id)}
      >
        Export Dst
      </a>
    ],
  };

  // 定义表格列
  const columns = [...max_kb_document_translate_columns(), editContentAndPreview];

  return (
    <>
      {contextHolder}
      <ApiTableLong
        key={tableKey} // 每次 key 变化都会重新渲染表格
        from={from}
        columns={columns}
        beforePageRequest={beforeDocumentPageRequest}
        beforeCreateRequest={beforeDocumentCreateRequest}
        containsUpload={true}
        maxFiles={1}
        uploadCategory="translate"
      />
    </>
  );
};
