import * as test from 'tape';
import { Alphabet } from '@konfirm/alphabet';
import { HybridISO7064 } from '../../source/main';

const Mod17_16 = new HybridISO7064({
	alphabet: Alphabet.from('0123456789ABCDEF')
});

test('README/Examples - Mod17_16.checksum', (t) => {
	t.equal(Mod17_16.checksum('D98989898909898'), 'B', 'Mod17_16.checksum of "D98989898909898" is B');
	t.equal(Mod17_16.checksum('D98989898909899'), '9', 'Mod17_16.checksum of "D98989898909899" is 9');

	t.end();
});

test('README/Examples - Mod17_16.generate', (t) => {
	t.equal(Mod17_16.generate('D98989898909898'), 'D98989898909898B', 'Mod17_16.generate for "D98989898909898" is "D98989898909898B');
	t.equal(Mod17_16.generate('D98989898909899'), 'D989898989098999', 'Mod17_16.generate for "D98989898909899" is "D989898989098999');

	t.end();
});

test('README/Examples - Mod17_16.validate', (t) => {
	t.equal(Mod17_16.validate('D98989898909898B'), true, 'Mod17_16.validate "D98989898909898B" is true');
	t.equal(Mod17_16.validate('D98989898909899B'), false, 'Mod17_16.validate "D98989898909899B" is false');
	t.equal(Mod17_16.validate('D989898989098999'), true, 'Mod17_16.validate "D989898989098999" is true');
	t.equal(Mod17_16.validate('D98-989-898-909-898-B'), true, 'Mod17_16.validate "D98-989-898-909-898-B" is true');

	t.end();
});
