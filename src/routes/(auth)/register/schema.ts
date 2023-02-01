import { z } from 'zod';

const phoneRegex =
	/(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/;

export const regStep1Schema = z.object({
	firstName: z.string({ required_error: 'First name is required' }).min(1).max(50),
	lastName: z.string({ required_error: 'Last name is required' }).min(1).max(50),
	email: z.string({ required_error: 'Email is required' }).email(),

	phoneNumber: z.string({ required_error: 'Phone number is required' }).regex(phoneRegex, {
		message: 'Phone number is invalid, make sure you include your country code e.g (+2349012345678)'
	})
});

export const regStep2UsersSchema = z
	.object({
		// Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
				message:
					'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			}),

		// Confirm password must match password
		confirmPassword: z.string({ required_error: 'Confirm password is required' })
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				path: ['confirmPassword'],
				code: 'custom',
				message: 'Passwords do not match'
			});
		}
	});

export const regStep2AgentSchema = z
	.object({
		address: z.string({ required_error: 'Address is required' }).min(1).max(100),
		businessName: z.string({ required_error: 'Business name is required' }).min(1).max(100),
		// Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
				message:
					'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			}),

		// Confirm password must match password
		confirmPassword: z.string({ required_error: 'Confirm password is required' })
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				path: ['confirmPassword'],
				code: 'custom',
				message: 'Passwords do not match'
			});
		}
	});
