# Brain Tumor Classification Model

Place your trained Swin Transformer model directory here.

## Expected Model Spec
- Input: (224, 224, 3) — RGB image (ImageNet normalization)
- Output: 4 classes — [Glioma, Meningioma, No Tumor, Pituitary]
- Architecture: microsoft/swin-tiny-patch4-window7-224
- Framework: PyTorch / HuggingFace Transformers

## Required Files
- `config.json` — Model configuration
- `preprocessor_config.json` — Image preprocessing config
- `pytorch_model.bin` — Trained model weights

## Without a model
The app runs in **demo mode** with deterministic random predictions.
To train your own model, use the Brain Tumor MRI Dataset from Kaggle.
