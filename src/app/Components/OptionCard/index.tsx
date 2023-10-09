// intended to render a card of sorts that displays information of a hotel room available to reserve
// displayed horizontally
// preview image will show
// description box will show details of the hotel room like 'no smoking', '1 master bed', etc
// Submit reservation button will make an api call to reserve the hotel room

import PreviewImage from '../PreviewImage';
import DescriptionBox from '../DescriptionBox';
import SubmitReservationButton from '../SubmitReservationButton';

const OptionCard = () => {
    return(
        <div>
            <PreviewImage />
            <DescriptionBox />
            <SubmitReservationButton />
        </div>
    )
}