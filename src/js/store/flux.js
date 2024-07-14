import { Action } from "@remix-run/router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			contacts: [],

			contact: {
				id: "",
				name: "",
				phone:"",
				email:"",
				address:""
			},

			othercontact: {
				id: "",
				name: "",
				phone:"",
				email:"",
				address:""
			}
		},
		
		
		actions: {


		
			createcontacts: async () =>{
				let actions = getActions();
				const response = await  fetch("https://playground.4geeks.com/contact/agendas/Iriagamb/contacts" ,{ method: "POST"});
				actions.getContacts();
				
			},




			getContacts: async() =>{
				let actions = getActions();
				try{
				const response = await  fetch("https://playground.4geeks.com/contact/agendas/Iriagamb/contacts")
					if (!response.ok){
					actions.createcontacts();
					}
				const data = await response.json();
				setStore({contacts: data.contacts})
				
				
			} catch (error){
				console.log(error);
				}
			},

			postContact: async (inputName, inputPhone, inputEmail, inputAddress)=>{
				let actions = getActions();
				const response = await  fetch("https://playground.4geeks.com/contact/agendas/Iriagamb/contacts" ,{ method: "POST", 
					body: JSON.stringify({
						name: inputName,
						phone: inputPhone,
						email: inputEmail,
						address: inputAddress
					}),
					 headers : {
						'Content-Type': 'application/json'
					 }
				} );
				 if (response.ok){
					alert ("hola, tu contacto se ha regristrado uwu")
					actions.getActions();
				 } else {
					alert(" No se ha podido registrar tu contacto :C")
				 }
			},

			setUpdate: async (id, name, phone, email, address) =>{
				setStore ({
					othercontact: {
						id: id,
						name: name,
						phone: phone,
						email: email,
						address: address
					},
				})
			},

			putContact: async(inputName, inputPhone, inputEmail, inputAddress) => {
				let actions = getActions();
				let store= getStore();
				const response = await  fetch("https://playground.4geeks.com/contact/agendas/Iriagamb/contacts" + "${store.othercontact.id}",
					{ method: "PUT",
						body: JSON.stringify({
							name: inputName,
							phone: inputPhone,
							email: inputEmail,
							address: inputAddress
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					 if (responde.ok ){
						alert("Contacto actualizado uwu")
						actions.getActions():
					 }else{
						alert("No se pudeo actualizar el contacto :c")
					 }
			},

			deleteContact: async (id) =>{
				let actions = getActions();
				const response = await  fetch("https://playground.4geeks.com/contact/agendas/Iriagamb/contacts" +"${id}",{ method: "DELETE",})
				if (!response.ok) {
					alert("No she puede eliminar");
				}else{
					actions.getActions();
				}
			}
		}
	}	
};

export default getState;
