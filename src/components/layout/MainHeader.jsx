import React from "react"

const MainHeader = () => {
	return (
		<header className="header-banner">
			<div className="overlay"></div>
			<div className="animated-texts overlay-content">
				<h1>
					Bienvenue à <span className="hotel-color"> ADM réservation</span>
				</h1>
				<h4>Découvrez la meilleure hospitalité de la ville</h4>
			</div>
		</header>
	)
}

export default MainHeader
