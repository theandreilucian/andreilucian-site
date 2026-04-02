# Replace remaining old CTAs with standardized CTA
import sys

def normalize_quotes(s):
    return s.replace("\u201c", '"').replace("\u201d", '"').replace("\u2019", "'")

path = r"d:\Website\X_THREADS_8_PACK.md"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_cta = """Thanks for reading my thread. I really appreciate your time.  
Follow @theandreilucian for more content.  
Retweet.  
https://www.andreilucian.com/ — Join 900+ digital creators who get weekly strategies on digital writing, personal branding, and turning their writing into real income."""

old_blocks = [
    """I apply the same "protocol" mindset to [YOUR NICHE].  
[YOUR CTA].  
If you enjoyed this, follow for more breakdowns of people who think in systems.  
[Optional: [IMAGE] – Bryan Johnson protocol or your own "system" diagram]""",
    """I write about influence, storytelling, and building in public.  
If you want to grow your audience and your network the right way, [YOUR CTA].  
Follow for more threads like this.  
[Optional: [DIAGRAM] – "How influence networks work" – high-level, no sensitive content]""",
    """I help [YOUR AUDIENCE] turn their story into a brand that gets attention (without the beef).  
[YOUR CTA].  
Follow for more breakdowns of people who win at the attention game.  
[Optional: [IMAGE] – 50 Cent quote or "character" framework]""",
    """If you're one rejection away from quitting—don't.  
[YOUR CTA].  
I help [YOUR AUDIENCE] turn their story into content that gets that one "yes."  
Follow for more threads on persistence and building in public.  
[Optional: [IMAGE] – J.K. Rowling quote or rejection → success timeline]""",
    """I'm now [YOUR CURRENT ROLE / RESULT].  
If you want [BENEFIT YOU OFFER], [YOUR CTA].  
Thanks for reading. Follow for more of my story and [YOUR CONTENT THEME].  
[Optional: [IMAGE] – before/after or timeline. [SOCIAL PROOF] – result or testimonial.]""",
]

for i, old in enumerate(old_blocks):
    if old in content:
        content = content.replace(old, new_cta, 1)
        print("Replaced CTA block", i + 1)
    else:
        old_alt = normalize_quotes(old)
        if old_alt in content:
            content = content.replace(old_alt, new_cta, 1)
            print("Replaced CTA block", i + 1, "(normalized)")
        else:
            # Show first 80 chars for debugging
            snippet = content[content.find("[YOUR CTA]"):content.find("[YOUR CTA]")+200] if "[YOUR CTA]" in content else "N/A"
            print("Block", i + 1, "not found. Snippet:", repr(snippet[:120]))

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Done.")
