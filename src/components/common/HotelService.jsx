import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
	FaCocktail,
	FaParking,
	FaSnowflake,
	FaTshirt,
	FaUtensils,
	FaWifi
} from "react-icons/fa"

const HotelService = () => {
	return (
		<>
			<div className="mb-2">
				<Header title={"Our Services"} />

				<Row className="mt-4">
					<h4 className="text-center">
					Services à <span className="hotel-color"> ADM </span>réservation
						<span className="gap-2">
							<FaClock className="ml-5" /> Réception ouverte 24h/24
						</span>
					</h4>
				</Row>
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaWifi /> WiFi
								</Card.Title>
								<Card.Text>Restez connecté grâce à un accès Internet haut débit.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaCocktail />Mini-bar
								</Card.Title>
								<Card.Text>Profitez d'une boisson rafraîchissante ou d'une collation dans notre minibar dans la chambre.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaParking /> Parking
								</Card.Title>
								<Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaSnowflake /> Air conditioning
								</Card.Title>
								<Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
			<hr />
		</>
	)
}

export default HotelService
