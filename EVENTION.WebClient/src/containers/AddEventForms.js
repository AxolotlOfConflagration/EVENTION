import React from "react";
import { Row } from "antd";
import { Button } from "antd";
import ShortForms from "../containers/ShortForms";
import axios from "axios";

class AddEventForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      shortDescription: "",
      longDescription: "",
      addressCity: "",
      categories: "",
      address: "",
      imageSource: "",
      eventStart: "",
      eventEnd: "",
      validname: "true bure",
      validlongDescription: "true bure",
      validshortDescription: "true bure",
      validaddressCity: "true bure",
      validcategories: "true bure",
      validaddress: "true bure",
      validimageSource: "true bure",
      valideventStart: "true bure",
      valideventEnd: "true bure",
      nameError: "",
      shortDescriptionError: "",
      longDescriptionError: "",
      addressCityError: "",
      categoriesError: "",
      addressError: "",
      imageSourceError: "",
      eventStartError: "",
      eventEndError: "",
      valid: false,
      message_from_post: ""
    };
    this.submitted = false;
    this.setEventName = this.setEventName.bind(this);
    this.setShortDesc = this.setShortDesc.bind(this);
    this.setLongDescription = this.setLongDescription.bind(this);
    this.chooseCity = this.chooseCity.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setData = this.setData.bind(this);
    this.setImageSource = this.setImageSource.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  validate = () => {
    if (this.state.name.length === 0) {
      console.log("jestem w name validate");
      this.setState({
        nameError: "Nazwa wydarzenia jest wymagana!",
        validname: "false malse"
      });
    }
    if (this.state.shortDescription.length === 0) {
      this.setState({
        shortDescriptionError: "Krótki opis wydarzenia jest wymagany!",
        validshortDescription: "false malse"
      });
    }
    if (!this.state.longDescription) {
      this.setState({
        longDescriptionError: "Długi opis wydarzenia jest wymagany!",
        validlongDescription: "false malse"
      });
    }
    if (!this.state.address) {
      this.setState({
        addressError: "Adres wydarzenia jest wymagany!",
        validaddress: "false malse"
      });
    }
    if (!this.state.addressCity) {
      this.setState({
        addressCityError: "Miasto jest wymagane!",
        validaddressCity: "false malse"
      });
    }
    if (!this.state.categories) {
      this.setState({
        categoriesError: "Kategoria jest wymagany!",
        validcategories: "false malse"
      });
    }
    if (!this.state.eventStart) {
      this.setState({
        eventStartError: "Data wydarzenia jest wymagana!",
        valideventStart: "false malse"
      });
    }

    if (!this.state.imageSource) {
      this.setState({
        imageSourceError: "Źródło do zdjęcia wydarzenia jest wymagane!",
        validimageSource: "false malse"
      });
    }
    return true;
  };

  setEventName(event) {
    this.setState({ name: event.target.value, nameError: "" });
    console.log(`Nazwa wydarzenia:  ${event.target.value}`);
  }
  setShortDesc(event) {
    this.setState({
      shortDescription: event.target.value,
      shortDescriptionError: ""
    });
    console.log(`Krótki opis:  ${event.target.value}`);
  }
  setLongDescription(event) {
    this.setState({
      longDescription: event.target.value,
      longDescriptionError: ""
    });
    console.log(`Długi opis:  ${event.target.value}`);
  }
  chooseCity(value) {
    this.setState({ addressCity: value, addressCityError: "" });
    console.log(`Miasto wydarzenia:  ${value}`);
  }
  chooseCategoryReset = () => {
    this.setState({ categories: null });
  };
  chooseCityReset = () => {
    this.setState({ addressCity: null });
  };
  chooseCategory(value) {
    this.setState({ categories: value, categoriesError: "" });
    console.log(`Kategoria wydarzenia:  ${value}`);
  }
  setAddress(event) {
    this.setState({ address: event.target.value, addressError: "" });
    console.log(`Dokłady adres wydarzenia:  ${event.target.value}`);
  }
  setData(date) {
    this.setState({
      eventStart: date[0]["_d"].toISOString(),
      eventEnd: date[1]["_d"].toISOString(),
      eventStartError: "",
      eventEndError: ""
    });
    console.log(`Start`, date[0]["_d"].toISOString());
    console.log(`End`, date[1]["_d"].toISOString());
  }
  setImageSource(event) {
    this.setState({ imageSource: event.target.value, imageSourceError: "" });
    console.log(`Źródło adresu wydarzenia:  ${event.target.value}`);
  }

  onClick = () => {
    const isValid = this.validate();
    console.log("clicked");
    console.log(isValid);
    console.log("name", this.state.validname);
    console.log("name", this.state.name);
    if (isValid) {
      console.log("name2", this.state.validname);
      console.log("sD", this.state.validshortDescription);
      console.log("lD", this.state.validlongDescription);
      console.log("nC", this.state.validaddressCity);
      console.log("add", this.state.validaddress);
      console.log("image", this.state.validimageSource);
      console.log("cate", this.state.validcategories);
      console.log("date", this.state.valideventStart);
      // if (
      //   this.state.validname === "true bure" &&
      //   this.state.validshortDescription === "true bure" &&
      //   this.state.validlongDescription === "true bure" &&
      //   this.state.validaddress === "true bure" &&
      //   this.state.validaddressCity === "true bure" &&
      //   this.state.validimageSource === "true bure" &&
      //   this.state.validcategories === "true bure" &&
      //   this.state.valideventStart === "true bure"
      // )
      console.log("len", this.state.name.length);
      if (
        this.state.name.length > 0 &&
        this.state.shortDescription.length > 0 &&
        this.state.longDescription.length > 0 &&
        this.state.address.length > 0 &&
        this.state.validaddressCity === "true bure" &&
        this.state.imageSource.length > 0 &&
        this.state.validcategories === "true bure" &&
        this.state.valideventStart === "true bure"
      ) {
        var today = new Date().toISOString();
        console.log(this.state.name);
        console.log(this.state.shortDescription);
        console.log(this.state.longDescription);
        console.log(this.state.addressCity);
        console.log(this.state.imageSource);
        console.log(this.state.categories);
        console.log(this.state.address);
        console.log(today);
        console.log(this.state.eventStart);
        console.log(this.state.eventEnd);

        axios
          .post("http://localhost:9000/event/create", {
            event: {
              name: this.state.name,
              shortDescription: this.state.shortDescription,
              longDescription: this.state.longDescription,
              ownerId: 1,
              creationDate: today,
              eventStart: this.state.eventStart,
              eventEnd: this.state.eventEnd,
              addressCity: this.state.addressCity,
              imageSource: this.state.imageSource,
              address: this.state.address
            },
            categories: this.state.categories
          })
          .then(res => {
            console.log(res);
            if (res.request.status === 200) {
              this.setState({ message_from_post: "Wydarzenie zostało dodane" });
              this.setState({
                name: "",
                shortDescription: "",
                longDescription: "",
                categories: null,
                address: "",
                imageSource: "",
                eventStart: null,
                eventEnd: null,
                addressCity: null,
                validname: "true bure",
                validshortDescription: "true bure",
                validlongDescription: "true bure",
                validaddressCity: "true bure",
                validcategories: "true bure",
                validaddress: "true bure",
                validimageSource: "true bure",
                valideventStart: "true bure",
                valideventEnd: "true bure",
                nameError: "",
                shortDescriptionError: "",
                longDescriptionError: "",
                addressCityError: "",
                categoriesError: "",
                addressError: "",
                imageSourceError: "",
                eventStartError: "",
                eventEndError: ""
              });
            }
          });
      } else {
        this.setState({
          message_from_post:
            "Błąd podczas tworzenia wydarzenia. Spróbuj jeszcze raz.",
          validshortDescription: "true bure",
          validlongDescription: "true bure",
          validaddressCity: "true bure",
          validcategories: "true bure",
          validaddress: "true bure",
          validimageSource: "true bure",
          valideventStart: "true bure",
          valideventEnd: "true bure"
        });
      }
    }
  };
  render() {
    return (
      <div>
        <Row>
          <br />
        </Row>
        <Row>
          <ShortForms
            name={this.state.name}
            setEventName={this.setEventName}
            nameError={this.state.nameError}
            shortDescription={this.state.shortDescription}
            setShortDesc={this.setShortDesc}
            shortDescriptionError={this.state.shortDescriptionError}
            longDescription={this.state.longDescription}
            setLongDescription={this.setLongDescription}
            longDescriptionError={this.state.longDescriptionError}
            addressCity={this.state.addressCity}
            chooseCity={this.chooseCity}
            addressCityError={this.state.addressCityError}
            categories={this.state.categories}
            chooseCategory={this.chooseCategory}
            categoriesError={this.state.categoriesError}
            address={this.state.address}
            setAddress={this.setAddress}
            addressError={this.state.addressError}
            eventStart={this.state.eventStart}
            eventStartError={this.state.eventStartError}
            eventEnd={this.state.eventEnd}
            eventEndError={this.state.eventEndError}
            setData={this.setData}
            setImageSource={this.setImageSource}
            imageSource={this.state.imageSource}
            imageSourceError={this.state.imageSourceError}
          />
        </Row>
        <Row>
          <br />
          <Button onClick={this.onClick} type={"primary"}>
            Utwórz
          </Button>
          <div>
            <text>{this.state.message_from_post}</text>
          </div>
        </Row>
      </div>
    );
  }
}

export default AddEventForms;
