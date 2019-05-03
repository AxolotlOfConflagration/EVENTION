import React from "react";
import { Row, Col } from "antd";
import NameEvent from "../components/NameEvent";
import ShortDesc from "../components/ShortDesc";
import LongDesc from "../components/LongDesc";
import CitySelect from "../components/CitySelect";
import CategorySelect from "../components/CategorySelect";
import Address from "../components/Address";
import DateSelect from "../components/DateSelect";
import ImageSource from "../components/ImageSource";

class ShortForms extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <NameEvent
            name={this.props.name}
            setEventName={this.props.setEventName}
            nameError={this.props.nameError}
          />
        </Row>
        <Row>
          <br />
          <ShortDesc
            shortDescription={this.props.shortDescription}
            setShortDesc={this.props.setShortDesc}
            shortDescriptionError={this.props.shortDescriptionError}
          />
        </Row>
        <Row>
          <br />
          <LongDesc
            longDescription={this.props.longDescription}
            setLongDescription={this.props.setLongDescription}
            longDescriptionError={this.props.longDescriptionError}
          />
        </Row>
        <Row>
          <br />
          <ImageSource
            setImageSource={this.props.setImageSource}
            imageSource={this.props.imageSource}
            imageSourceError={this.props.imageSourceError}
          />
        </Row>
        <Row>
          <br />
          <CitySelect
            city={this.props.addressCity}
            chooseCity={this.props.chooseCity}
            value={this.props.addressCity}
            addressCityError={this.props.addressCityError}
          />
        </Row>
        <Row>
          <br />
          <CategorySelect
            category={this.props.categories}
            chooseCategory={this.props.chooseCategory}
            value={this.props.categories}
            categoriesError={this.props.categoriesError}
          />
        </Row>
        <Row>
          <br />
          <Address
            address={this.props.address}
            setAddress={this.props.setAddress}
            addressError={this.props.addressError}
          />
        </Row>
        <Row>
          <br />
          <DateSelect
            setData={this.props.setData}
            eventStart={this.props.eventStart}
            eventEnd={this.props.eventEnd}
            eventStartError={this.props.eventStartError}
            eventEndError={this.props.eventEndError}
          />
        </Row>
      </div>
    );
  }
}

export default ShortForms;
