import './ClosestMatch.css';
import close_icon from '@/assets/close_iconn.svg';

const ClosestMatch = ({ closestMatch, onClose }) => {
  return (
    closestMatch && (
      <div className="modalOverlay-closest">
      <div className="popupCard-closest">
      <img src={close_icon} alt="close" className="close_icon-closest" onClick={onClose} />
        <h2 className="heading-closest">Closest Match</h2>
        <p className="info-closest"><span className='text_heading_property'>Item Type:</span> {closestMatch.itemType}</p>
        <p className="info-closest"><span className='text_heading_property'>Item Name: </span>{closestMatch.itemName}</p>
        <p className="info-closest"><span className='text_heading_property'>Item Description: </span>{closestMatch.itemDescription}</p>
        <p className="info-closest"><span className='text_heading_property'>Item Quantity: </span>{closestMatch.itemQuantity}</p>

        <p className="info-closest"><span className='text_heading_property'>Image:</span></p>
        <img
          className="donation-image-closest"
          src={`https://project-giveback.azurewebsites.net/api/getImage/${closestMatch._id}`}
          alt={`Donation ${closestMatch._id}`}
        />
      </div>
    </div>
    )
  );
};

export default ClosestMatch;
