import {HfInference} from '@huggingface/inference';
const inference=new HfInference("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");
const model="meta-llama/Meta-Llama-3-8B-Instruct";
for await (const output of inference.textGenerationStream({
    model: model,
    inputs: "Give me a blog on dogs",
    parameters: { max_new_tokens: 500 }
  })) {
    console.log(output.token.text, output.generated_text);
  }
