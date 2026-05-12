"""Replace {{占位符}} across all HTML/XML/TXT files using config.json."""
import json, re, os, sys

SITE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(SITE_DIR, "config.json"), "r", encoding="utf-8") as f:
    config = json.load(f)

# Check if any value is still a placeholder
pending = [k for k, v in config.items() if v.startswith("{{")]
if pending:
    print("请先编辑 config.json 填写以下信息：")
    for k in pending:
        print(f"  - {k}")
    sys.exit(1)

# Collect all target files
extensions = (".html", ".xml", ".txt")
files = []
for root, _, names in os.walk(SITE_DIR):
    for name in names:
        if name.endswith(extensions):
            files.append(os.path.join(root, name))

count = 0
for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    for key, value in config.items():
        placeholder = "{{%s}}" % key
        new_content = new_content.replace(placeholder, value)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        count += 1
        print(f"✓ {os.path.relpath(filepath, SITE_DIR)}")

print(f"\n替换完成，共更新 {count} 个文件。")
