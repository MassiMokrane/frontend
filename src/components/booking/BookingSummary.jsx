import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const checkInDate = moment(booking.checkInDate)
	const checkOutDate = moment(booking.checkOutDate)
	const numberOfDays = checkOutDate.diff(checkInDate, "days")
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])

	return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title hotel-color">Reservation Summary</h4>
				<p>
					Nom: <strong>{booking.guestFullName}</strong>
				</p>
				<p>
					
					E-mail: <strong>{booking.guestEmail}</strong>
				</p>
				<p>
					Date d'arrivée : <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
				Date de départ :<strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
				Nombre de jours réservés : <strong>{numberOfDays}</strong>
				</p>

				<div>
					<h5 className="hotel-color">Nombre d'invités</h5>
					<strong>
					Adulte{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
					</strong>
					<strong>
						<p>Enfants : {booking.numOfChildren}</p>
					</strong>
				</div>

				{payment > 0 ? (
					<>
						<p>
						Paiement tota <strong>${payment}</strong>
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Réservation confirmée, redirigeant vers le paiement...
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Chargement...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">La date de départ doit être postérieure à la date d'arrivée.</p>
				)}
			</div>
		</div>
	)
}

export default BookingSummary
