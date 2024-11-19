import {ProColumns} from '@ant-design/pro-components';
import React from "react";
import {Upload} from "antd";

export const max_kb_document_translate_columns = (): ProColumns<any>[] => [
  {
    "title": "name",
    "dataIndex": "name",
    "valueType": "text"
  },
  {
    "title": "src_lang",
    "dataIndex": "src_lang",
    "valueType": "text",
    hideInSearch: true,
    initialValue: "English",
  },
  {
    "title": "src_content",
    "dataIndex": "src_content",
    "valueType": "textarea",
    ellipsis: true,
  },
  {
    "title": "dst_lang",
    "dataIndex": "dst_lang",
    "valueType": "text",
    hideInSearch: true,
    initialValue: "Chinese",
  },
  {
    "title": "dst_content",
    "dataIndex": "dst_content",
    "valueType": "textarea",
    ellipsis: true,
  },
  {
    "title": "Files",
    "dataIndex": "files",
    "valueType": "text",
    "hideInForm": true,
    search: false,
    render: (_, record) => (
      <Upload
        listType="text"
        fileList={record.files}
        showUploadList={{
          showRemoveIcon: false,
          showPreviewIcon: true
        }}
      />
    ),
  },
  {
    title: "Remark",
    dataIndex: "remark",
  },
  {
    title: "update_time",
    dataIndex: "update_time",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    key: "update_time",
    title: "update_time",
    dataIndex: "update_time_range",
    valueType: "dateTimeRange",
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
