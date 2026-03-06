## We are running a scientific experiment

Our goal is to measure outcomes across a parameter matrix and gain knowledge,
therefore:

- Treat every configuration (provider × mode × algorithm × convolution ×
  metric) as a distinct data point worth preserving and comparing.
- Use command line arguments for npm commands to decide experimental conditions per run, so all
  configurations remain intact and reproducible.
- Keep all generated artifacts — vector JSON files, benchmark outputs — as
  experimental data that future runs and analyses will depend on.
- When a condition produces unexpected results, record and analyze it; the
  finding is valuable regardless of whether it looks like success.
- When adding tokens, descriptions, or algorithms, treat each addition as a new
  experimental variable and document what changed and why.
- Embedding vectors within a single run ought to come from exactly one provider
  and one mode (e.g. openai_described), since comparability across conditions
  requires that each condition be internally consistent.
