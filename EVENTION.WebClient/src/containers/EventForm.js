import React from "react";
import { Row, Col } from "antd";
import CitySelect from "../components/CitySelect";
import CategorySelect from "../components/CategorySelect";
import DateSelect from "../components/DateSelect";
import { Form, Icon, Input, Button, Checkbox, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Event: {
        name: "",
        shortDescription: "",
        longDescription: "",
        ownerId: 1,
        creationDate: "",
        eventStart: "",
        eventEnd: "",
        addressCity: "",
        imageSource: "",
        geoJson: "{}",
        address: ""
      },
      categories: [],
      city: "",
      category: [],
      test: ""
    };
    this.submitted = false;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  WriteForm = ({ text, w, v, func }) => (
    <form onSubmit={this.handleFormSubmit}>
      <input
        placeholder={text}
        style={{ width: w }}
        value={v}
        onChange={func}
        type="text"
      />
    </form>
  );
  handleFormSubmit = e => {
    e.preventDefault();
    this.submitted = true;

    console.log(this.state.test);
  };
  handleNameChange = e => {
    this.setState({ name: e.target.value });
    //this.setState({ [e.target.name]: e.target.value });
  };
  handleShortChange = e => {
    this.setState({ shortDescription: e.target.value });
    //this.setState({ [e.target.name]: e.target.value });
  };
  handleLongChange = e => {
    this.setState({ longDescription: e.target.value });
    //this.setState({ [e.target.name]: e.target.value });
  };
  handleAddressChange = e => {
    this.setState({ address: e.target.value });
    //this.setState({ [e.target.name]: e.target.value });
  };
  chooseCategory = category => {
    this.setState({ categories: category });
    console.log(category);
    console.log(this.state.category);
  };

  chooseCity = city => {
    this.setState({ city: city });
    console.log(city);
    console.log(this.state.city);
  };

  render() {
    return (
      <div>
        <Col span={20}>
          <Row>
            <br />
            <this.WriteForm
              text="Nazwa Wydarzenia"
              w={400}
              //name="nazwa_wydarzenia"
              //message="Nazwa wydarzenia jest wymagana."

              v={this.state.Event.name}
              func={e => this.handleNameChange(e)}
            />
          </Row>
          <Row>
            <br />
            <this.WriteForm
              text="Krótki opis wydarzenia"
              w={400}
              v={this.state.Event.shortDescription}
            />
          </Row>
          <Row>
            <br />
            <TextArea
              placeholder="Długi opis wydarzenia"
              //value={this.state.event.longDescription}
              //onChange={this.handleChange}
              autosize={{ minRows: 2, maxRows: 6 }}
              style={{ width: 400 }}
              value={this.state.Event.longDescription}
              onChange={this.handleInputChange}
            />
          </Row>
          <br />
          <CitySelect
            city={this.state.Event.addressCity}
            chooseCity={this.chooseCity}
            value={this.state.Event.addressCity}
          />
          <Row>
            <br />
            <CategorySelect
              category={this.state.categories}
              chooseCategory={this.chooseCategory}
              value={this.state.categories}
            />
          </Row>
          <Row>
            <br />
            <this.WriteForm
              text="Dokładny adres wydarzenia"
              w={400}
              v={this.state.Event.address}
            />
          </Row>
          <Row>
            <br />
            <DateSelect />
          </Row>
          <Row>
            <br />
            <Upload action="//jsonplaceholder.typicode.com/posts/" directory>
              <Button>
                <Icon type="upload" />
                Wgraj zdjęcie
              </Button>
            </Upload>
          </Row>
          <Row>
            <br />
            <Button onClick={this.handleFormSubmit}> Dodaj</Button>
          </Row>
        </Col>
      </div>
    );
  }
}

export default EventForm;
