import styles from "./navbar.module.css";

export default function Navbar() {
	return (
		<>
			<div className={styles.navbar}>
				<img
					className={styles.coverImage}
					src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png"
					alt="album"
				/>
				<span>PhotoFolio</span>
			</div>
		</>
	);
}
