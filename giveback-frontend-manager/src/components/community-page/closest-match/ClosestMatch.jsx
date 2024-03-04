import './ClosestMatch.css';
import close_icon from '@/assets/close_iconn.svg';

const ClosestMatch = ({ closestMatch, onClose }) => {
  return (
    closestMatch && (
      <div className="modalOverlay-closest">
      <div className="popupCard-closest">
      <img src={close_icon} alt="close" className="close_icon-closest" onClick={onClose} />
        <h2 className="heading-closest">Closest Match</h2>
        <p className="info-closest">Item Type: {closestMatch.itemType}</p>
        <p className="info-closest">Item Name: {closestMatch.itemName}</p>
        <p className="info-closest">Item Description: {closestMatch.itemDescription}</p>
        <p className="info-closest">Item Quantity: {closestMatch.itemQuantity}</p>
        <p className="info-closest">Donator's Name: {closestMatch.donorName}</p>
        <p className="info-closest">Donator's Address: {closestMatch.donorAddress}</p>
        <p className="info-closest">Image:</p>
        <img
          className="donation-image-closest"
          src={`http://localhost:5000/api/getImage/${closestMatch._id}`}
          alt={`Donation ${closestMatch._id}`}
        />
      </div>
    </div>
    )
  );
};

export default ClosestMatch;
