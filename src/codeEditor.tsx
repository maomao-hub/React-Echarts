import React from 'react';

//import { css } from 'emotion';
// import { stylesFactory } from '@grafana/ui';
// import { css } from 'emotion';

/* HTML element styling
// styling guide https://github.com/grafana/grafana/blob/master/contribute/style-guides/styling.md
// not in use any more, becuase found css class name via inspecting page. e.g. class "panel-options-group"
// const getStyles = stylesFactory(() => ({
//   wrapper: css`
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 16px;
//   `,
//   label: css`
//     margin: 0px 0px 4px;
//     padding: 0px 0px 0px 2px;
//     max-width: 480px;
//     font-size: 12px;
//     font-weight: 500;
//     line-height: 1.25;
//     color: rgb(159, 167, 179);
//   `,
//   name: css`
//     display: flex;
//     align-items: center;
//   `,
//   description: css`
//     display: block;
//     margin-top: 2px;
//     font-size: 12px;
//     font-weight: 400;
//     color: rgb(123, 128, 135);
//   `,
// }));
*/

interface PropsType {
  label?: React.ReactNode; // ？ optional prop
  description?: string;
}
// <PropsType> 泛型规定输入是 PropsType类型
const CodeEditor: React.FC<PropsType> = ({ label, description, children }) => {
  return (
    <div className="panel-options-group">
      <div className="panel-options-group__header">
        <span className="panel-options-group__title">{label}</span>
      </div>
      <div className="panel-options-group__body">
        <div className="editor-row">
          <div className="section gf-form-group">
            <h5 className="section-heading">{description}</h5>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
