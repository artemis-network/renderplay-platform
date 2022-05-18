import HangMan from '../../assets/hangman/hangman.png'
import Bar from '../common/bar/Bar'

export default function () {

	return (<div>
		<Bar is_in_raffle={true} />
		<img src={HangMan} alt="hangMan" />
	</div>)
}