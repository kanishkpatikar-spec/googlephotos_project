# Next Iteration Roadmap

## 1. Multimodal OCR & Embeddings
The current MVP relies heavily on text descriptions and metadata. The next logical step is to run Google Gemini Vision models over the photo library to extract text (OCR) and deep semantic visual features.

## 2. On-Device Processing
To resolve privacy risks permanently, we will move the Llama-3 extraction layer to an on-device SLM (Small Language Model) like Gemma-2B using WebGPU.

## 3. Temporal Graph Traversal
Instead of just vector similarity, implement a graph database to understand "Photos taken 3 days after the trip to Seattle."