import HangMan from '../assets/hangman.png'
import Bar from './wordle/Bar/Bar'

export default function () {

	return (<div>
		<Bar is_in_raffle={true} />
		<img src={HangMan} alt="hangMan" />
	</div>)
}