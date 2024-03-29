import React from "react"
import { Container } from "react-bootstrap"

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Le Meilleur Acceuill chez <span className="hotel-color">ADM-Réservations</span>
					</h1>
					<h3>On vous offre les meilleurs services pour touts vous besoins</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax
