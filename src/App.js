import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth"
import { db, auth, storage } from "./config/firebase"
import React, { useEffect, useState } from "react";
import { getDocs, addDoc, deleteDoc, updateDoc, doc, collection, query, orderBy } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import { generateDetailedTimestampId } from "./functions/naming"
import { useEditableField } from "./functions/editableField"
import { NameUploadedFiles } from "./functions/nameUploadedFiles"

import ExportIc from './icons/export_ic.jsx'
import UpdateIc from './icons/update_ic.jsx'
import SaveIc from './icons/save_ic.jsx'
import EditIc from './icons/edit_ic.jsx'
import DeleteIc from './icons/delete_ic.jsx'
import ExternalIc from "./icons/external_ic";
import SendMailAic from './icons/sendMail_aic.js'


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

    const [fileUploads, setFileUploads] = useState([]);
    const [fileList, setFileList] = useState({});
    const [sortOrder, setSortOrder] = useState("asc"); // Initialzustand ist aufsteigend

    const { isEditable, toggleEdit } = useEditableField();

    const [isStopped, setIsStopped] = useState(true);

    const orderCollectionRef = collection(db, "orders");


    const getFileUrl = async (order) => {
        const folderRef = ref(storage, `${order.OrderId}`);

            try {
                const fileList = await listAll(folderRef); // Listet alle Dateien im Ordner

                // Erstellt eine Liste von Promises, um die Download-URL für jede Datei zu erhalten
                const urlPromises = fileList.items.map((fileRef) => {
                    return getDownloadURL(fileRef); // Holt die Download-URL für jede Datei
                });

                // Wartet auf die Fertigstellung aller URL-Abrufe
                const urls = await Promise.all(urlPromises);

                console.log('Alle Datei-URLs erfolgreich abgerufen');
                return urls; // Gibt die Liste der URLs zurück
            } catch (error) {
                console.error("Fehler beim Abrufen der Datei-URLs:", error);
                return []; // Gibt eine leere Liste zurück im Fehlerfall
            }
        }

    const handleGetFileUrls = async (order) => {
        const urls = await getFileUrl(order);
        setFileList(prevState => ({
            ...prevState,
            [order.id]: urls, // Speichert die URLs unter der spezifischen Bestell-ID
        }));
    };

    const toggleSortOrder = () => { // Funktion zum Umschalten der Sortierreihenfolge
        setOrderList(prevOrderList => [...prevOrderList].reverse());
        setSortOrder(prevSortOrder => prevSortOrder === "asc" ? "desc" : "asc");
    };


    const getOrderList = async () => {
        try {
            const querySnapshot = await getDocs(query(orderCollectionRef, orderBy("OrderId")));
            const sortedData = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));

            for (let order of sortedData) {
                await handleGetFileUrls(order); // Warten, bis die Datei-URLs für jeden Auftrag geholt wurden
            }

            setOrderList(sortedData);
        } catch (error) {
            console.error("getOrderList Error: ", error)
        }
    };

  useEffect(() => {
    getOrderList();
  }, []);

  const onSubmitOrder = async (orderId) => {
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
            OrderId: orderId,
        });

        await getOrderList();
    } catch (error) {
        console.error(error)
    }
  };

    const deleteFiles = async (orderId) => {
        const folderRef = ref(storage, `${orderId}/`); // Erstellt eine Referenz zum Ordner basierend auf orderId

        try {
            const fileList = await listAll(folderRef); // Listet alle Dateien im Ordner

            // Erstellt eine Liste von Promises für jede zu löschende Datei
            const deletePromises = fileList.items.map((fileRef) => {
                return deleteObject(fileRef); // Löscht jede Datei
            });

            // Wartet auf die Fertigstellung aller Löschvorgänge
            await Promise.all(deletePromises);

            console.log('Alle Dateien erfolgreich gelöscht');
        } catch (error) {
            console.error("Fehler beim Löschen der Dateien:", error);
        }
    }


    const deleteOrder = async (id, orderId) => {
        try {
            // Zuerst die zugehörigen Dateien löschen
            await deleteFiles(orderId); // Hier verwenden Sie die orderId, um die Dateien zu löschen

            // Dann das Dokument aus Firestore löschen
            const orderDoc = doc(db, "orders", id);
            await deleteDoc(orderDoc);

            // Die Liste der Bestellungen aktualisieren
            await getOrderList();
            console.log(`Bestellung mit id ${id} und zugehörige Dateien wurden erfolgreich gelöscht.`);
        } catch (error) {
            console.error(`Error while deleting Order: ${error}`);
        }
    }

    const updateOrder = async (id) => {
      try {
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
          //await getOrderList();
      } catch (error) {
          console.error(error);
      }

    };

    const uploadFiles = async (orderId) => {
        if (!fileUploads.length) return;

        const uploadPromises = fileUploads.map(file => {
            const fileRef = ref(storage, `${orderId}/${file.name}`);
            return uploadBytes(fileRef, file);
        });

        try {
            await Promise.all(uploadPromises).then(async () => {
                console.log('Alle Dateien wurden erfolgreich hochgeladen.');
                // Nach dem Hochladen der Dateien, lade alle orders
                await onSubmitOrder(orderId);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const removeFile = (fileName) => {
        setFileUploads(fileUploads.filter(file => file.name !== fileName));
    };

  return (
      <div className="App">
          <Auth/>
          <div className='uploadDiv card'>
              <form className="uploadForm">
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
                  <form className='uploadFileForm'>

                      <label htmlFor="file-upload" className="custom-file-upload">
                          <ExportIc className="exportIc" color={'black'}/>
                      </label>

                      <input type="file" id="file-upload" name="fileUpload" accept=".jpg, .jpeg, .png, .pdf"
                             onChange={(e) => setFileUploads(prevFiles => [...prevFiles, ...Array.from(e.target.files)])}
                             multiple/>
                      <ul className='uploadedFileUl'>
                          {NameUploadedFiles(fileUploads, removeFile)}
                      </ul>
                  </form>
                  <fieldset>
                      <legend>Empfänger Informationen:</legend>
                      <input type="text" id="recipientFirstname" name="empfaengerVorname" placeholder="Vorname"
                             onChange={(e) => setNewRecipientFirstName(e.target.value)} required/><br/>
                      <input type="text" id="recipientLastname" name="empfaengerNachname" placeholder="Nachname"
                             onChange={(e) => setNewRecipientLastName(e.target.value)} required/><br/>
                      <input type="text" id="recipientStreet" name="empfaengerStrasse" placeholder="Starße"
                             onChange={(e) => setNewRecipientStreet(e.target.value)} required/><br/>
                      <input type="text" id="recipientZip" name="empfaengerPLZ" placeholder="PLZ"
                             onChange={(e) => setNewRecipientZip(e.target.value)}/><br/>
                      <input type="text" id="recipientLocation" name="empfaengerOrt" placeholder="Ort"
                             onChange={(e) => setNewRecipientLocation(e.target.value)} required/><br/>
                      <input type="text" id="recipientCountry" name="empfaengerLand" placeholder="Land"
                             onChange={(e) => setNewRecipientCountry(e.target.value)} required/><br/>
                      <input type="text" id="recipientAdditional" name="empfaengerAdditional" placeholder="Adresszusatz"
                             onChange={(e) => setNewRecipientAdditional(e.target.value)}/><br/>
                  </fieldset>
              </form>
              <button className='uploadButton'
                      onMouseEnter={() => setIsStopped(false)} // Animation starten, wenn Mauszeiger eintritt
                      onMouseLeave={() => setIsStopped(true)}
                      onClick={async (e) => {
                          e.preventDefault();
                          const newId = generateDetailedTimestampId(); // Generiert eine neue ID bei jedem Klick
                          await uploadFiles(newId); // Ruft uploadFile auf, nachdem die neue ID gesetzt wurde
                      }}>
                  <span>Submit</span>
                  <SendMailAic
                      isStopped={isStopped}
                  />
              </button>
          </div>
          <button onClick={toggleSortOrder}>Sortierung umkehren</button>
          <div>
              {orderList.map((order) => (
                  <div key={order.id} className="orderDiv card">
                      <h2 className="orderH2">{order.OrderId}</h2>
                      <form className="orderForm">
                          <fieldset className="orderSenderFieldset">
                              <legend>Sender Informationen:</legend>
                              <input type="text" className="orderSenderInput" id="senderFirstname" name="senderVorname"
                                     placeholder={order.SenderFirstname}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderFirstName(e.target.value)} required/><br/>
                              <input type="text" className="orderSenderInput" id="senderLastname" name="senderNachname"
                                     placeholder={order.SenderLastname}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderLastName(e.target.value)} required/><br/>
                              <input type="text" className="orderSenderInput" id="senderStreet" name="senderStrasse"
                                     placeholder={order.SenderStreet}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderStreet(e.target.value)} required/><br/>
                              <input type="text" className="orderSenderInput" id="senderZip" name="senderPLZ"
                                     placeholder={order.SenderZip}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderZip(e.target.value)}/><br/>
                              <input type="text" className="orderSenderInput" id="senderLocation" name="senderOrt"
                                     placeholder={order.SenderLocation}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderLocation(e.target.value)} required/><br/>
                              <input type="text" className="orderSenderInput" id="senderAdditional"
                                     name="senderAdditional"
                                     placeholder={order.SenderAdditional}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderAdditional(e.target.value)}/><br/>
                              <input type="email" className="orderSenderInput" id="senderEmail" name="senderEmail"
                                     placeholder={order.SenderEmail}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedSenderEmail(e.target.value)} required/><br/>
                          </fieldset>
                          <fieldset className="orderRecipientFieldset">
                              <legend>Empfänger Informationen:</legend>
                              <input type="text" className="orderRecipientInput" id="recipientFirstname"
                                     name="empfaengerVorname"
                                     placeholder={order.RecipientFirstname}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientFirstName(e.target.value)} required/><br/>
                              <input type="text" className="orderRecipientInput" id="recipientLastname"
                                     name="empfaengerNachname"
                                     placeholder={order.RecipientLastname}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientLastName(e.target.value)} required/><br/>
                              <input type="text" className="orderRecipientInput" id="recipientStreet"
                                     name="empfaengerStrasse"
                                     placeholder={order.RecipientStreet}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientStreet(e.target.value)} required/><br/>
                              <input type="text" className="orderRecipientInput" id="recipientZip" name="empfaengerPLZ"
                                     placeholder={order.RecipientZip}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientZip(e.target.value)}/><br/>
                              <input type="text" className="orderRecipientInput" id="recipientLocation"
                                     name="empfaengerOrt"
                                     placeholder={order.RecipientLocation}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientLocation(e.target.value)} required/><br/>
                              <input type="text" className="orderRecipientInput" id="recipientCountry"
                                     name="empfaengerLand"
                                     placeholder={order.RecipientCountry}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientCountry(e.target.value)} required/><br/>
                              <input type="text" className="orderRecipientInput" id="recipientAdditional"
                                     name="empfaengerAdditional"
                                     placeholder={order.RecipientAdditional}
                                     readOnly={!isEditable}
                                     onChange={(e) => setUpdatedRecipientAdditional(e.target.value)}/><br/>
                          </fieldset>
                      </form>
                      <section className="orderSection">
                          <nav className="orderNav">
                              {fileList[order.id]?.map((url, index) => ( // Stellt sicher, dass nur die URLs für die spezifische Bestellung angezeigt werden
                                  <a className="orderFileLink" key={index} href={url} target="_blank"
                                     rel="noopener noreferrer">
                                      Datei {index + 1}
                                      <ExternalIc className="updateIc" color={'black'}/>
                                  </a>
                              ))}
                          </nav>
                          <aside className="orderAside">
                              <button className="orderBtn editBtn" onClick={toggleEdit}>
                                  {isEditable ? <SaveIc className="saveIc" color={'green'}/> :
                                      <EditIc className="editIc" color={'black'}/>}

                              </button>
                              <button className="orderBtn deteBtn"
                                      onClick={() => deleteOrder(order.id, order.OrderId)}>
                                  <DeleteIc className="deleteIc" color={'red'}/>
                              </button>
                              <button className="orderBtn updateBtn" onClick={() => updateOrder(order.id)}>
                                  <UpdateIc className="updateIc" color={'black'}/>
                              </button>
                          </aside>
                      </section>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default App;
