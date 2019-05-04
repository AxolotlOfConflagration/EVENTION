import React from "react";
import { Icon, Button } from "antd";

class CategoryButton extends React.Component {
  ButtonAll = ({ text, icon, id }) => (
    <span>
      <Button
        type={this.props.currentCategory === id ? "primary" : "dashed"}
        size="default"
        icon={icon}
        shape="round"
        onClick={() => this.props.chooseCategory(id)}
      >
        {text}
      </Button>
    </span>
  );

  ButtonText = ({ text, icon, id }) => (
    <span>
      <Button
        type={
          this.props.currentCategory != null &&
          this.props.currentCategory[0] === id[0]
            ? "primary"
            : "dashed"
        }
        size="default"
        icon={icon}
        shape="round"
        onClick={() => this.props.chooseCategory(id)}
      >
        {text}
      </Button>
    </span>
  );
  ButtonIcon = ({ text, icon, id }) => (
    <span>
      <Button
        type={
          this.props.currentCategory != null &&
          this.props.currentCategory[0] === id[0]
            ? "primary"
            : "dashed"
        }
        size="default"
        shape="round"
        onClick={() => this.props.chooseCategory(id)}
      >
        <Icon component={icon} />
        {text}
      </Button>
    </span>
  );
  IconCultureSvg = () => (
    <svg
      enableBackground="new 0 0 48 48"
      height="18px"
      version="1.1"
      viewBox="0 0 48 48"
      width="18px"
    >
      <g id="Layer_4">
        <g>
          <path
            d="M46.239,22.07v-11.8c0-1.299-1.052-2.353-2.353-2.353H20.286c-1.3,0-2.352,1.054-2.352,2.353v11.8    c0,0-0.005,0.252,0,0.659v0.056c0,0.005,0,0.01,0,0.012c0.007,0.306,0.023,0.713,0.055,1.185c0.097,1.957,0.41,3.845,0.828,5.55    c1.343,5.841,4.729,13.723,13.27,18.418c8.65-5.041,12.005-13.012,13.315-18.78c0.689-2.959,0.822-5.265,0.837-6.223V22.71    C46.246,22.313,46.239,22.07,46.239,22.07z M21.461,22.173c0,0,4.08-5.466,8.241,0C25.677,28.564,21.461,22.173,21.461,22.173z     M32.087,38.717c-3.898,0-7.059-3.16-7.059-7.057c7.58,6.064,14.116,0,14.116,0C39.145,35.557,35.986,38.717,32.087,38.717z     M34.473,22.173c4.16-5.466,8.239,0,8.239,0S38.497,28.564,34.473,22.173z"
            fill="#333333"
          />
          <path
            d="M18.269,36.874c-0.018-0.04-1.556-3.18-1.991-4.761c-0.488-1.899-0.853-3.767-1.111-5.497    c-1.951,0.131-4.113,0.93-6.311,2.992c-0.013-3.48,2.504-6.36,5.818-6.952c-0.034-0.376-0.096-0.74-0.114-1.123    c-0.033-0.475-0.048-0.879-0.055-1.187c0-0.003,0-0.008,0-0.012v-0.059c-0.004-0.406,0-0.654,0-0.654v-0.656    c-0.029-1.28,0-2.035,0-2.035V7.82c0-1.299,1.051-2.353,2.353-2.353h13.208V2.405c0-1.299-1.052-2.354-2.353-2.354h-23.6    c-1.3,0-2.353,1.056-2.353,2.354v11.8c0,0-0.004,0.25,0,0.656v0.056c0,0.005,0,0.01,0,0.015c0.007,0.308,0.023,0.71,0.055,1.184    c0.097,1.958,0.409,3.843,0.827,5.551c1.344,5.838,4.728,13.72,13.27,18.418c0.82-0.479,1.558-0.998,2.268-1.53l0.006,0.002    l0.069-0.059c0.049-0.037,0.102-0.072,0.152-0.109c-0.002-0.005-0.002-0.007-0.003-0.012l0.45-0.369L18.269,36.874z M5.286,14.305    c0,0,4.082-5.461,8.242,0C9.503,20.696,5.286,14.305,5.286,14.305z"
            fill="#333333"
          />
        </g>
      </g>
    </svg>
  );
  IconMusicSvg = () => (
    <svg
      enableBackground="new 0 0 32 32"
      height="18px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 32 32"
      width="18px"
    >
      {" "}
      <path
        d="M31.286,0.469C30.923,0.164,30.468,0,30.001,0c-0.115,0-0.232,0.01-0.348,0.031l-17.002,3  C11.695,3.199,10.999,4.029,10.999,5v2v1v14.17C9.984,21.434,8.667,21,7.205,21c-0.85,0-1.7,0.141-2.529,0.416  C2.778,22.049,1.256,23.318,0.5,24.9c-0.584,1.223-0.659,2.553-0.214,3.746C1.047,30.684,3.209,32,5.794,32  c0.85,0,1.7-0.139,2.528-0.416c1.897-0.631,3.419-1.9,4.175-3.48c0.325-0.682,0.477-1.396,0.483-2.104h0.018V10  c0.115,0,0.232-0.01,0.348-0.029l16.655-2.939V19.17C28.985,18.434,27.669,18,26.206,18c-0.85,0-1.701,0.141-2.529,0.416  c-1.898,0.633-3.42,1.902-4.174,3.484c-0.584,1.223-0.66,2.553-0.215,3.746C20.05,27.684,22.21,29,24.796,29  c0.85,0,1.701-0.139,2.529-0.416c1.896-0.631,3.418-1.9,4.174-3.48c0.326-0.682,0.477-1.396,0.484-2.104h0.018V5V4V2  C32.001,1.41,31.739,0.848,31.286,0.469z M7.688,29.688c-2.396,0.799-4.873,0.018-5.529-1.74c-0.658-1.76,0.751-3.834,3.146-4.633  c2.396-0.799,4.873-0.02,5.529,1.74C11.493,26.814,10.084,28.889,7.688,29.688z M26.653,26.688c-2.398,0.799-4.875,0.018-5.531-1.74  c-0.658-1.76,0.752-3.834,3.146-4.633c2.398-0.799,4.875-0.02,5.531,1.74C30.458,23.814,29.05,25.889,26.653,26.688z M29.96,5  L12.958,8V7V5L29.96,2v2V5z"
        fill="#333333"
        id="music"
      />
    </svg>
  );
  IconHackathon = () => (
    <svg
      enableBackground="new 0 0 64 64"
      height="18px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 64 64"
      width="18px"
    >
      {" "}
      <path
        d="M46,31v-1h9.148c0.297,0.732,1.013,1.25,1.852,1.25c1.104,0,2-0.896,2-2s-0.896-2-2-2   c-1.019,0-1.851,0.765-1.975,1.75H46v-1h-2v-2h2v-1h2.651l3-2h3.497c0.297,0.732,1.013,1.25,1.852,1.25c1.104,0,2-0.896,2-2   s-0.896-2-2-2c-1.019,0-1.851,0.765-1.975,1.75h-3.677l-3,2H46v-1h-2v-3h-3v-2h-1v-1.833l3-4V9.429   c0.861-0.223,1.5-0.999,1.5-1.929c0-1.104-0.896-2-2-2s-2,0.896-2,2c0,0.93,0.639,1.706,1.5,1.929v2.404l-3,4V18h-1v2h-2v-2h-1   v-3.845l2-2.917V9.429c0.861-0.223,1.5-0.999,1.5-1.929c0-1.104-0.896-2-2-2s-2,0.896-2,2c0,0.93,0.639,1.706,1.5,1.929v1.5   l-2,2.917V18h-1v2h-2v-2h-1v-6.571c0.861-0.223,1.5-0.999,1.5-1.929c0-1.104-0.896-2-2-2s-2,0.896-2,2   c0,0.93,0.639,1.706,1.5,1.929V18h-1v2h-2v-2h-1v-3.207l-2-2V9.429c0.861-0.223,1.5-0.999,1.5-1.929c0-1.104-0.896-2-2-2   s-2,0.896-2,2c0,0.93,0.639,1.706,1.5,1.929v3.778l2,2V18h-1v2h-3v3h-2v1h-1.599l-3-2H9.725c-0.124-0.985-0.956-1.75-1.975-1.75   c-1.104,0-2,0.896-2,2s0.896,2,2,2c0.838,0,1.554-0.518,1.852-1.25h3.497l3,2H18v1h2v2h-2v1H8.725   c-0.124-0.985-0.956-1.75-1.975-1.75c-1.104,0-2,0.896-2,2s0.896,2,2,2c0.838,0,1.554-0.518,1.852-1.25H18v1h2v2h-2v1h-5.275   c-0.124-0.985-0.956-1.75-1.975-1.75c-1.104,0-2,0.896-2,2s0.896,2,2,2c0.838,0,1.554-0.518,1.852-1.25H18v1h2v2h-2v1h-2.901l-3,2   H8.725c-0.124-0.985-0.956-1.75-1.975-1.75c-1.104,0-2,0.896-2,2s0.896,2,2,2c0.838,0,1.554-0.518,1.852-1.25h3.8l3-2H18v1h2v3h3v2   h1v2.333l-3,4v2.737c-0.861,0.223-1.5,0.999-1.5,1.929c0,1.104,0.896,2,2,2s2-0.896,2-2c0-0.93-0.639-1.706-1.5-1.929v-2.404l3-4   V46h1v-2h2v2h1v4.345l-2,2.917v1.809c-0.861,0.223-1.5,0.999-1.5,1.929c0,1.104,0.896,2,2,2s2-0.896,2-2   c0-0.93-0.639-1.706-1.5-1.929v-1.5l2-2.917V46h1v-2h2v2h1v7.071c-0.861,0.223-1.5,0.999-1.5,1.929c0,1.104,0.896,2,2,2   s2-0.896,2-2c0-0.93-0.639-1.706-1.5-1.929V46h1v-2h2v2h1v3.707l2,2v3.364c-0.861,0.223-1.5,0.999-1.5,1.929c0,1.104,0.896,2,2,2   s2-0.896,2-2c0-0.93-0.639-1.706-1.5-1.929v-3.778l-2-2V46h1v-2h3v-3h2v-1h3.293l2,2h3.855c0.297,0.732,1.013,1.25,1.852,1.25   c1.104,0,2-0.896,2-2s-0.896-2-2-2c-1.019,0-1.851,0.765-1.975,1.75h-3.318l-2-2H46v-1h-2v-2h2v-1h5.148   c0.297,0.732,1.013,1.25,1.852,1.25c1.104,0,2-0.896,2-2s-0.896-2-2-2c-1.019,0-1.851,0.765-1.975,1.75H46v-1h-2v-2H46z M57,28.25   c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S56.448,28.25,57,28.25z M57,21.25c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1   S56.448,21.25,57,21.25z M44,24h1v1h-1V24z M41.5,7.5c0-0.552,0.448-1,1-1s1,0.448,1,1s-0.448,1-1,1S41.5,8.052,41.5,7.5z    M35.5,7.5c0-0.552,0.448-1,1-1s1,0.448,1,1s-0.448,1-1,1S35.5,8.052,35.5,7.5z M28.5,9.5c0-0.552,0.448-1,1-1s1,0.448,1,1   s-0.448,1-1,1S28.5,10.052,28.5,9.5z M21.5,7.5c0-0.552,0.448-1,1-1s1,0.448,1,1s-0.448,1-1,1S21.5,8.052,21.5,7.5z M7.75,23.25   c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S8.302,23.25,7.75,23.25z M6.75,30.25c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1   S7.302,30.25,6.75,30.25z M10.75,35.25c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S11.302,35.25,10.75,35.25z M6.75,42.25   c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S7.302,42.25,6.75,42.25z M20,40h-1v-1h1V40z M20,35h-1v-1h1V35z M20,30h-1v-1h1V30z    M20,25h-1v-1h1V25z M22.5,57c0,0.552-0.448,1-1,1s-1-0.448-1-1s0.448-1,1-1S22.5,56.448,22.5,57z M28.5,57c0,0.552-0.448,1-1,1   s-1-0.448-1-1s0.448-1,1-1S28.5,56.448,28.5,57z M35.5,55c0,0.552-0.448,1-1,1s-1-0.448-1-1s0.448-1,1-1S35.5,54.448,35.5,55z    M42.5,57c0,0.552-0.448,1-1,1s-1-0.448-1-1s0.448-1,1-1S42.5,56.448,42.5,57z M39,19h1v1h-1V19z M34,19h1v1h-1V19z M29,19h1v1h-1   V19z M24,19h1v1h-1V19z M25,45h-1v-1h1V45z M30,45h-1v-1h1V45z M35,45h-1v-1h1V45z M40,45h-1v-1h1V45z M43,43H21V21h22V43z    M57,40.25c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S56.448,40.25,57,40.25z M45,39v1h-1v-1H45z M53,33.25   c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S52.448,33.25,53,33.25z M45,34v1h-1v-1H45z M44,29h1v1h-1V29z"
        fill="#37474F"
      />
      <path d="M41,23H23v18h18V23z M40,40H24V24h16V40z" fill="#37474F" />
      <rect
        fill="#37474F"
        height="1"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 78.7548 28.3787)"
        width="9.899"
        x="28.55"
        y="30"
      />
      <rect
        fill="#37474F"
        height="1"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 72.1335 34.1213)"
        width="8.485"
        x="24.757"
        y="31.5"
      />
    </svg>
  );

  render() {
    return (
      <div>
        <this.ButtonAll text="Wszystkie" id={null} />
        <this.ButtonText text="Sport" icon="dribbble" id={[1]} />
        <this.ButtonIcon text="Kultura" icon={this.IconCultureSvg} id={[2]} />
        <this.ButtonIcon text="Koncert" icon={this.IconMusicSvg} id={[3]} />
        <this.ButtonText text="Targi" icon="team" id={[4]} />
        <this.ButtonIcon text="Hackathon" icon={this.IconHackathon} id={[6]} />
        <this.ButtonText text="Inne" id={[5]} />
      </div>
    );
  }
}

export default CategoryButton;
