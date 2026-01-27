'use server';

/**
 * @fileOverview Suggests relevant service categories based on vendor descriptions or user requests.
 *
 * - suggestServiceCategories - A function that suggests service categories.
 * - SuggestServiceCategoriesInput - The input type for the suggestServiceCategories function.
 * - SuggestServiceCategoriesOutput - The return type for the suggestServiceCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestServiceCategoriesInputSchema = z.object({
  text: z.string().describe('Vendor description or user request text.'),
});
export type SuggestServiceCategoriesInput = z.infer<typeof SuggestServiceCategoriesInputSchema>;

const SuggestServiceCategoriesOutputSchema = z.object({
  categories: z.array(z.string()).describe('Suggested service categories.'),
});
export type SuggestServiceCategoriesOutput = z.infer<typeof SuggestServiceCategoriesOutputSchema>;

export async function suggestServiceCategories(input: SuggestServiceCategoriesInput): Promise<SuggestServiceCategoriesOutput> {
  return suggestServiceCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestServiceCategoriesPrompt',
  input: {schema: SuggestServiceCategoriesInputSchema},
  output: {schema: SuggestServiceCategoriesOutputSchema},
  prompt: `You are an expert in service categorization.

  Based on the following text, suggest relevant service categories.

  Text: {{{text}}}

  Categories should be a simple array of strings.
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const suggestServiceCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestServiceCategoriesFlow',
    inputSchema: SuggestServiceCategoriesInputSchema,
    outputSchema: SuggestServiceCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
