import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth"
import { db, auth, storage } from "./config/firebase"
import { useEffect, useState } from "react";
import { getDocs, addDoc, deleteDoc, updateDoc, doc, collection } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

function App() {
  const [orderList, setOrderList] = useState([]);

  const [newSenderFirstName, setNewSenderFirstName] = useState("N/A");
  const [newSenderLastName, setNewSenderLastName] = useState("N/A");
  const [newSenderStreet, setNewSenderStreet] = useState("N/A");
  const [newSenderZip, setNewSenderZip] = useState("N/A");
  const [newSenderLocation, setNewSenderLocation] = useState("N/A");
  const [newSenderAdditional, setNewSenderAdditional] = useState("N/A");
  const [newSenderEmail, setNewSenderEmail] = useState("N/A");

    const [newRecipientFirstName, setNewRecipientFirstName] = useState("N/A");
    const [newRecipientLastName, setNewRecipientLastName] = useState("N/A");
    const [newRecipientStreet, setNewRecipientStreet] = useState("N/A");
    const [newRecipientZip, setNewRecipientZip] = useState("N/A");
    const [newRecipientLocation, setNewRecipientLocation] = useState("N/A");
    const [newRecipientCountry, setNewRecipientCountry] = useState("N/A");
    const [newRecipientAdditional, setNewRecipientAdditional] = useState("N/A");

    const [updatedSenderFirstName, setUpdatedSenderFirstName] = useState("N/A");
    const [updatedSenderLastName, setUpdatedSenderLastName] = useState("N/A");
    const [updatedSenderStreet, setUpdatedSenderStreet] = useState("N/A");
    const [updatedSenderZip, setUpdatedSenderZip] = useState("N/A");
    const [updatedSenderLocation, setUpdatedSenderLocation] = useState("N/A");
    const [updatedSenderAdditional, setUpdatedSenderAdditional] = useState("N/A");
    const [updatedSenderEmail, setUpdatedSenderEmail] = useState("N/A");

    const [updatedRecipientFirstName, setUpdatedRecipientFirstName] = useState("N/A");
    const [updatedRecipientLastName, setUpdatedRecipientLastName] = useState("N/A");
    const [updatedRecipientStreet, setUpdatedRecipientStreet] = useState("N/A");
    const [updatedRecipientZip, setUpdatedRecipientZip] = useState("N/A");
    const [updatedRecipientLocation, setUpdatedRecipientLocation] = useState("N/A");
    const [updatedRecipientCountry, setUpdatedRecipientCountry] = useState("N/A");
    const [updatedRecipientAdditional, setUpdatedRecipientAdditional] = useState("N/A");

    const [fileUpload, setFileUpload] = useState(null);

  const orderCollectionRef = collection(db, "orders");
    const getOrderList = async () => {
        try {
            const data = await getDocs(orderCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setOrderList(filteredData);
        } catch (error) {
            console.error(error)
        }
    };

  useEffect(() => {
    getOrderList();
  }, []);

  const onSubmitOrder = async () => {
    try {
        await addDoc(orderCollectionRef, {
            SenderFirstname: newSenderFirstName,
            SenderLastname: newSenderLastName,
            SenderStreet: newSenderStreet,
            SenderZip: newSenderZip,
            SenderLocation: newSenderLocation,
            SenderAdditional: newSenderAdditional,
            SenderEmail: newSenderEmail,

            RecipientFirstname: newRecipientFirstName,
            RecipientLastname: newRecipientLastName,
            RecipientStreet: newRecipientStreet,
            RecipientZip: newRecipientZip,
            RecipientLocation: newRecipientLocation,
            RecipientCountry: newRecipientCountry,
            RecipientAdditional: newRecipientAdditional,
        });

        await getOrderList();
    } catch (error) {
        console.error(error)
    }
  }

  const deleteOrder = async (id) => {
      const orderDoc = doc(db, "orders", id);
      await deleteDoc(orderDoc);
      await getOrderList();
  }

    const updateOrder = async (id) => {
        const orderDoc = doc(db, "orders", id);
        await updateDoc(orderDoc,{
            SenderFirstname: updatedSenderFirstName,
            SenderLastname: updatedSenderLastName,
            SenderStreet: updatedSenderStreet,
            SenderZip: updatedSenderZip,
            SenderLocation: updatedSenderLocation,
            SenderAdditional: updatedSenderAdditional,
            SenderEmail: updatedSenderEmail,

            RecipientFirstname: updatedRecipientFirstName,
            RecipientLastname: updatedRecipientLastName,
            RecipientStreet: updatedRecipientStreet,
            RecipientZip: updatedRecipientZip,
            RecipientLocation: updatedRecipientLocation,
            RecipientCountry: updatedRecipientCountry,
            RecipientAdditional: updatedRecipientAdditional,
        });
        await getOrderList();
    };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `customerFiles/${fileUpload.name}`);
    try {
        await uploadBytes(filesFolderRef, fileUpload);
    } catch(error) {
        console.error(error);
    }
  };

  return (
    <div className="App">sa
      <Auth />
        <form>
            <fieldset>
                <legend>Sender Informationen:</legend>
                <input type="text" id="senderFirstname" name="senderVorname" placeholder="Vorname"
                       onChange={(e) => setNewSenderFirstName(e.target.value)} required/><br/>
                <input type="text" id="senderLastname" name="senderNachname" placeholder="Nachname"
                       onChange={(e) => setNewSenderLastName(e.target.value)} required/><br/>
                <input type="text" id="senderStreet" name="senderStrasse" placeholder="Starße"
                       onChange={(e) => setNewSenderStreet(e.target.value)} required/><br/>
                <input type="text" id="senderZip" name="senderPLZ" placeholder="PLZ"
                       onChange={(e) => setNewSenderZip(e.target.value)}/><br/>
                <input type="text" id="senderLocation" name="senderOrt" placeholder="Ort"
                       onChange={(e) => setNewSenderLocation(e.target.value)} required/><br/>
                <input type="text" id="senderAdditional" name="senderAdditional" placeholder="Adresszusatz"
                       onChange={(e) => setNewSenderAdditional(e.target.value)}/><br/>
                <input type="email" id="senderEmail" name="senderEmail" placeholder="Email"
                       onChange={(e) => setNewSenderEmail(e.target.value)} required/><br/>
            </fieldset>
            <fieldset>
                <legend>Empfänger Informationen:</legend>
                <input type="text" id="recipientFirstname" name="empfaengerVorname" placeholder="Vorname"
                       onChange={(e) => setNewRecipientFirstName(e.target.value)} required/><br/>
                <input type="text" id="recipientLastname" name="empfaengerNachname" placeholder="Nachname"
                       onChange={(e) => setNewRecipientLastName(e.target.value)} required/><br/>
                <input type="text" id="recipientStreet" name="empfaengerStrasse" placeholder="Starße"
                       onChange={(e) => setNewRecipientStreet(e.target.value)} required/><br/>
                <input type="text" id="recipientZip" name="empfaengerPLZ" placeholder="PLZ"
                       onChange={(e) => setNewRecipientZip(e.target.value)} /><br/>
                <input type="text" id="recipientLocation" name="empfaengerOrt" placeholder="Ort"
                       onChange={(e) => setNewRecipientLocation(e.target.value)} required/><br/>
                <input type="text" id="recipientCountry" name="empfaengerLand" placeholder="Land"
                       onChange={(e) => setNewRecipientCountry(e.target.value)} required/><br/>
                <input type="text" id="recipientAdditional" name="empfaengerAdditional"  placeholder="Adresszusatz"
                       onChange={(e) => setNewRecipientAdditional(e.target.value)} /><br/>
            </fieldset>
            <button onClick={onSubmitOrder}>Insert</button>
        </form>
        <div>
            {orderList.map((order) => (
                <div>
                    <h1>
                        Sender: {order.SenderFirstname} {order.SenderLastname}
                    </h1>
                    <p>Adresse: {order.SenderStreet}, {order.SenderZip} {order.SenderLocation}</p>
                    <p>Adresszusatz: {order.SenderAdditional}</p>
                    <p>Email: {order.SenderEmail}</p>
                    <h1>
                        Empfänger: {order.RecipientFirstname} {order.RecipientLastname}
                    </h1>
                    <p>Adresse: {order.RecipientStreet}, {order.RecipientZip} {order.RecipientLocation} {order.RecipientCountry}</p>
                    <p>Adresszusatz: {order.RecipientAdditional}</p>

                    <button onClick={() => deleteOrder(order.id)}>Delete Order</button>

                    <details>
                        <form>
                            <fieldset>
                                <legend>Sender Informationen:</legend>
                                <input type="text" id="senderFirstname" name="senderVorname" placeholder={order.SenderFirstname}
                                       onChange={(e) => setUpdatedSenderFirstName(e.target.value)} required/><br/>
                                <input type="text" id="senderLastname" name="senderNachname" placeholder={order.SenderLastname}
                                       onChange={(e) => setUpdatedSenderLastName(e.target.value)} required/><br/>
                                <input type="text" id="senderStreet" name="senderStrasse" placeholder={order.SenderStreet}
                                       onChange={(e) => setUpdatedSenderStreet(e.target.value)} required/><br/>
                                <input type="text" id="senderZip" name="senderPLZ" placeholder={order.SenderZip}
                                       onChange={(e) => setUpdatedSenderZip(e.target.value)}/><br/>
                                <input type="text" id="senderLocation" name="senderOrt" placeholder={order.SenderLocation}
                                       onChange={(e) => setUpdatedSenderLocation(e.target.value)} required/><br/>
                                <input type="text" id="senderAdditional" name="senderAdditional"
                                       placeholder={order.SenderAdditional}
                                       onChange={(e) => setUpdatedSenderAdditional(e.target.value)}/><br/>
                                <input type="email" id="senderEmail" name="senderEmail" placeholder={order.SenderEmail}
                                       onChange={(e) => setUpdatedSenderEmail(e.target.value)} required/><br/>
                            </fieldset>
                            <fieldset>
                                <legend>Empfänger Informationen:</legend>
                                <input type="text" id="recipientFirstname" name="empfaengerVorname"
                                       placeholder={order.RecipientFirstname}
                                       onChange={(e) => setUpdatedRecipientFirstName(e.target.value)} required/><br/>
                                <input type="text" id="recipientLastname" name="empfaengerNachname"
                                       placeholder={order.RecipientLastname}
                                       onChange={(e) => setUpdatedRecipientLastName(e.target.value)} required/><br/>
                                <input type="text" id="recipientStreet" name="empfaengerStrasse" placeholder={order.RecipientStreet}
                                       onChange={(e) => setUpdatedRecipientStreet(e.target.value)} required/><br/>
                                <input type="text" id="recipientZip" name="empfaengerPLZ" placeholder={order.RecipientZip}
                                       onChange={(e) => setUpdatedRecipientZip(e.target.value)}/><br/>
                                <input type="text" id="recipientLocation" name="empfaengerOrt" placeholder={order.RecipientLocation}
                                       onChange={(e) => setUpdatedRecipientLocation(e.target.value)} required/><br/>
                                <input type="text" id="recipientCountry" name="empfaengerLand" placeholder={order.RecipientCountry}
                                       onChange={(e) => setUpdatedRecipientCountry(e.target.value)} required/><br/>
                                <input type="text" id="recipientAdditional" name="empfaengerAdditional"
                                       placeholder={order.RecipientAdditional}
                                       onChange={(e) => setUpdatedRecipientAdditional(e.target.value)}/><br/>
                            </fieldset>
                            <button onClick={() => updateOrder(order.id)}>Update</button>
                        </form>
                    </details>
                </div>
            ))}
        </div>

        <div>
            <input type="file" id="files" name="fileUpload" accept=".jpg, .jpeg, .png, .pdf"
                   onChange={(e) => setFileUpload(e.target.files)} multiple/>
            <button onClick={uploadFile}>Upload File</button>
        </div>
    </div>
  );
}

export default App;
