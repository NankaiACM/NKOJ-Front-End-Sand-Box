/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export default function generateColumns() {
  const columns = [];
  const cId = ['report_id', 'reporter', 'reportee', 'type', 'which', 'handler', 'result', 'when'];
  const cZh = ['举报编号', '举报者', '被举报者', '违规类型', '讨论编号', '处理者', '处理结果', '时间'];
  for (const i in cId) {
    columns.push({
      title: cZh[i],
      key: cId[i],
      dataIndex: cId[i],
      scopedSlots: { customRender: cId[i] },
    });
  }
  return columns;
}
