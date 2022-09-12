import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {

	const [heightField, setHeightField] = useState<number>(0);
	const [weightField, setWeightField] = useState<number>(0);
	const [showItem, setShowItem] = useState<Level | null>(null);

	const handleCalculateButton = () => {
		if (heightField && weightField) {
			setShowItem(calculateImc(heightField, weightField));
		} else {
			alert('Digite todos os campos.')
		}
	}

	const handleBackButton = () => {
		setShowItem(null);
		setHeightField(0);
		setWeightField(0);
	}

	return (
		<div className={styles.main}>
			<header>
				<div className={styles.headerContainer}>
					<img src={poweredImage} alt="" width={150} />
				</div>
			</header>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<h1>Calcule seu IMC.</h1>
					<p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

					<input
						type="number"
						placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
						value={heightField > 0 ? heightField : ''}
						onChange={event => setHeightField(parseFloat(event.target.value))}
						onKeyDown={(event) => event.key === 'Enter' ? handleCalculateButton() : ''}
						disabled={showItem ? true : false}
					/>

					<input
						type="number"
						placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
						value={weightField > 0 ? weightField : ''}
						onChange={event => setWeightField(parseFloat(event.target.value))}
						onKeyDown={(event) => event.key === 'Enter' ? handleCalculateButton() : ''}
						disabled={showItem ? true : false}
					/>

					<button onClick={handleCalculateButton} disabled={showItem ? true : false}>Calcular</button>
				</div>

				<div className={styles.rightSide}>
					{!showItem &&
						<div className={styles.grid}>
							{levels.map((item, key) => (
								<GridItem key={key} data={item} />
							))}
						</div>
					}
					{showItem && 
						<div className={styles.rightBig}>
							<div className={styles.rightArrow} onClick={handleBackButton}>
								<img src={leftArrowImage} alt="" width="25"/>
							</div>
							<GridItem data={showItem}/>
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default App;