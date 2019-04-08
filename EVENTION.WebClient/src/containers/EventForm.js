import React from "react";
import { Row, Col } from "antd";
import CitySelect from "../components/CitySelect";
import CategorySelect from "../components/CategorySelect";
import DateSelect from "../components/DateSelect";
import MyLayout from "../containers/Layout";
import {Form, Icon, Input, Button, Checkbox} from 'antd';

class EventForm extends React.Component{

    WriteForm = ({text, func}) =>(
        <span>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
            <Input placeholder={text} />
        </Form.Item>
        </Form>   
      </span>
    )

    render(){
        return(
            <div>
            <MyLayout>
          <Col span={20}>
          <Row>
            <br></br>
              <this.WriteForm text="Nazwa Wydarzenia"/>
            </Row>
            <Row>
            <br></br>
              <this.WriteForm text="Krótki opis wydarzenia"/>
            </Row>
            <Row>
            <br></br>
              <this.WriteForm text="Długi opis wydarzenia"/>
            </Row>
            <br></br>
           <CitySelect />
           <Row>
            <br></br>
            <CategorySelect />
            </Row>
           <Row>
            <br></br>
              <DateSelect />
            </Row>
          </Col>
        </MyLayout>



            </div>
        ); 
    }
}

export default EventForm;