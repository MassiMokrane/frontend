import React, { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	})

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBookingInfo(data)
			setError(null)
		} catch (error) {
			setBookingInfo(emptyBookingInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}

	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.id)
			setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
			setBookingInfo(emptyBookingInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">Trouver ma réservation</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Entrer le code de confirmation"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
						Trouver une réservation
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>
					Trouver votre réservation...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? (
					<div className="col-md-6 mt-4 mb-5">
						<h3>Informations de réservation</h3>
						<p className="text-success">Code de confirmation: {bookingInfo.bookingConfirmationCode}</p>
						<p>Numéro de salle: {bookingInfo.room.id}</p>
						<p>type de salle:{bookingInfo.room.roomType}</p>
						<p>
						Date d'arrivée :{" "}
							{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
						</p>
						<p>
						Date de départ :{" "}
							{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
						</p>
						<p>Nom et prénom: {bookingInfo.guestName}</p>
						<p>Adresse e-mail:{bookingInfo.guestEmail}</p>
						<p>Adultes: {bookingInfo.numOfAdults}</p>
						<p>Enfants: {bookingInfo.numOfChildren}</p>
						<p>Nombre total d'invités : {bookingInfo.totalNumOfGuests}</p>

						{!isDeleted && (
							<button
								onClick={() => handleBookingCancellation(bookingInfo.id)}
								className="btn btn-danger">
								Annuler la réservation
							</button>
						)}
					</div>
				) : (
					<div>chargement...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	)
}

export default FindBooking
