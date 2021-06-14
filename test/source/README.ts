import * as test from 'tape';
import { Alphabet } from '@konfirm/alphabet';
import { HybridISO7064 } from '../../main';

const Mod17_16 = new HybridISO7064({
	alphabet: Alphabet.from('0123456789ABCDEF')
});

test('README/Examples - Mod17_16.checksum', (t) => {
	t.equal(Mod17_16.checksum('D98989898909898'), 'B');
	t.equal(Mod17_16.checksum('D98989898909899'), '9');

	t.end();
});

test('README/Examples - Mod17_16.generate', (t) => {
	t.equal(Mod17_16.generate('D98989898909898'),
		'D98989898909898B'
	);
	t.equal(Mod17_16.generate('D98989898909899'),
		'D989898989098999'
	);

	t.end();
});

test('README/Examples - Mod17_16.validate', (t) => {
	t.equal(Mod17_16.validate('D98989898909898B'), true);
	t.equal(Mod17_16.validate('D98989898909899B'), false);
	t.equal(Mod17_16.validate('D989898989098999'), true);

	t.end();
});

test('README/Examples - Mod17_16.validate', (t) => {
	t.equal(Mod17_16.validate('D98-989-898-909-898-B'), true);

	t.end();
});
