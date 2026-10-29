#!/usr/bin/env python3
"""Check Solstice Active RSA copy against Google's exact character limits.

Character counts are EXACT (Python len over the raw string). Never estimated.
Limits are read from ../references/sa-google-rsa-specs.md's Character limits
table and mirrored here as constants — update both if the spec changes.

Usage:
    # Check one field:
    python3 sa_check_copy.py --field headline --text "Squat-Proof. Sweat-Tested."

    # Read the text from stdin (safest for copy with quotes/apostrophes/emoji):
    printf '%s' "Studio to Street, No Change" | python3 sa_check_copy.py --field headline --stdin

Fields: headline (30), description (90), path (15).
"""
import argparse
import sys

LIMITS = {
    "headline": 30,
    "description": 90,
    "path": 15,
}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--field", required=True, choices=sorted(LIMITS), help="Which RSA field this copy is for")
    ap.add_argument("--text", help="The copy to check (or use --stdin)")
    ap.add_argument("--stdin", action="store_true", help="Read the copy from stdin")
    args = ap.parse_args()

    if args.stdin:
        text = sys.stdin.read()
    elif args.text is not None:
        text = args.text
    else:
        ap.error("provide --text or --stdin")

    limit = LIMITS[args.field]
    count = len(text)  # EXACT count of the raw string

    print(f"Field  : {args.field}")
    print(f"Copy   : {text!r}")
    print(f"Length : {count} characters (exact)")

    if count <= limit:
        print(f"Result : OK — {count}/{limit}, {limit - count} characters to spare.")
        return 0
    over = count - limit
    print(f"Result : OVER by {over} character{'s' if over != 1 else ''} — {count}/{limit}. Trim {over}.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
