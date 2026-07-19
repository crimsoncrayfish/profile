---
title: 100% of the Thinking
date: 2026-05-20
readTime: 12 min read
description: An article on how to think about incorporating ai into your work as a software engineer
tags: [ai, engineering]
---

It's a Saturday, 11pm. PagerDuty alarms went off forty minutes
ago. The service has been throwing 500s since the Friday
afternoon deploy. You're on the call. Someone is sharing their
screen. The stack trace points at a function nobody can quite
explain.

> "I think this is what the code is trying to do."

That sentence is fine in a code review. The reviewer pushes back,
the author scrolls up, they figure it out together, the PR gets
cleaned up, life continues. The same sentence at 11pm on a
Saturday is something else. There is no scrolling up. The code is
already running. The customer's invoices are already wrong.
Somewhere in the function the author "wrote" last week is a
branch they didn't understand when they accepted it, and the
production traffic just found it.

If you haven't been on that call yet, you will be. The version of
you that's on the call is being built right now, in how you're
choosing to write code this week.

This is the part of the AI conversation the velocity posts skip.
The PR is the safety net. Production is the actual job. Code you
wrote and code you generated look identical in review and behave
very differently at 2am, and the difference between "I built
this" and "I shipped this" is the difference between a
forty-minute fix and a four-hour archaeological dig.

**TLDR:** Clickbait title aside, this article is
long because it attempts to capture a nuanced opinion that
doesn't reduce to a take. The short version: AI changed how fast
we can produce code and didn't change how fast we can understand
it, and most of the trouble comes from not understanding the
difference. There's a way to use it that respects the gap and a
way that pretends the gap isn't there. The rest of the article is
about the difference.

Writing code was never the bottleneck. Understanding code was.
That hasn't changed, and no tool has changed it.
<sup><a href="#footnote-1">[*]</a></sup>

To say why, we have to go back to a paper from 1985.

## The theory is the product

Peter Naur argued that programming is not the production of
code. It is the construction of a theory in the programmer's
head. A working model of what the system does, why it does it
that way, what it assumes about its inputs, where it will bend,
where it will snap. The code, in Naur's view, is a byproduct. The
theory is the actual thing. When the people who hold the theory
leave, the code becomes legacy, even if nothing about the code
itself has changed.

Every engineer who has joined a team with an old codebase has
lived this. The arc is familiar enough to be a meme.

```
Week 1:  "This code is garbage."
Week 2:  "Let's rewrite the whole module, it's clearly wrong."
Week 3:  "Oh, there were some constraints we didn't know about."
Week 4:  "Okay, let's adapt the existing structure instead."
Week 6:  "Wait, this is starting to look like the original."
Week 8:  "It's exactly the original, with worse naming."
Week 10: "Now I understand why it's like this."
```

That loop is not a failure of the new engineer. That loop is the
theory being rebuilt, painfully, in a new head. The original
author compressed a hundred small decisions into the shape of
the code. Reading the code at face value does not decompress
them. You have to bump into the constraints, one by one, by
trying to do something else and watching it not work. The mess
that ends up looking identical to what was there before is the
receipt for the understanding you now have.

This is the work AI is silently skipping past. Not the typing.
The thinking.

## Looking at some research

METR ran a trial in early 2025 with sixteen experienced
developers working on their own open-source projects. The
developers predicted they would be 24% faster with AI tools.
Afterward, they reported feeling about 20% faster. The measured
outcome was that they were 19% slower. The study is small and the
authors are careful about generalizing. But the gap between what
the developers felt and what the clock showed is the kind of
thing most engineers, if they're honest, recognize from their
own week.

An Anthropic study had participants learn a new async Python
library, some with heavy AI assistance, some without. The
heavy-AI group scored 17% lower on a follow-up evaluation. Inside
that average was a split. People who used the model to
interrogate their reasoning scored well. People who used it to
skip the reasoning scored badly. The study was about learning a
new skill, not losing an old one, and the sample was small, and
the task was constrained. But the pattern it gestures at, that
the value of the tool depends on what the human is doing with
their mind while it runs, is the pattern most of this article is
about.

Neither study proves anything on its own. They're data points
that match a shape engineers have been describing informally for
two years. The shape is the thing.

That study was about learning a new skill, not losing an old
one. But the mechanism it exposes doesn't stop applying once you
have a job. Comprehension requires cognitive engagement, and AI
makes it trivially easy to skip the engagement. At work the
stakes are higher, not lower. The feedback loop on not
understanding your code is measured in production incidents
instead of quiz scores.

The speed at which a human can understand code has not changed.
It is what it was in 2019. We can generate code faster now. We
can read it at the same pace we always could. If you accelerate
one side of that equation and not the other, you are not getting
faster. You are building up a queue of unread code that calls
itself your codebase.

It's the difference between reviewing your notes the night before
an exam and doing a mock test. Re-reading notes feels productive.
The page is familiar. You nod along. You think "yes, I know
this." Then the exam asks you to apply it and you find out that
recognition was never the same as understanding. Generated code
you skimmed and approved is the notes. The 11pm production
incident is the exam.

None of this means the tools don't help. It means the help isn't
where the marketing puts it. As long as companies are hiring
engineers, the job they are hiring for is the thinking. The
typing was always the cheap part, and now it's cheaper, but
nobody pays an engineering salary for typing. They pay engineers
for the theory in your head and the judgment that comes with it.
A tool that helps you build the theory faster is worth the
money. A tool that helps you skip building it is a different
product being sold under the same name.

The sections that follow split by career stage, but the line
isn't clean. A senior at a startup with no review culture is,
functionally, in the position the junior section is about. A
junior in a team with strict change control is partially
insulated. Read the one that fits the situation you're in this
week, not the title on your contract.

## If you're starting out

For the junior engineer trying to figure out whether any of this
is still worth it: it is, and more than before, but the path is
narrower than it used to be. The split from the Anthropic study
is your whole career compressed into one number. Every
interaction with the model is that fork, played out in
miniature, dozens of times a day.

You can ask the model to write the function, paste the result,
move on. Do that for two years and you will be exactly as capable
as you are today, in a market that has moved without you. Or you
can ask it to write the function, read every line, ask it why it
picked that data structure, push back when the explanation is
thin, write the next one yourself, and hand it back for
critique. The second path is slower this week. It is the only
one that compounds.

A concrete rule that has held up well: don't ship code you
couldn't explain to the next engineer. The bar is that you can
say what the code does, why it's structured the way it is, and
how it fails. When you hit a piece of generated code you can't
pass that bar on, that is the most valuable moment in your day.
It is a free lesson with infinite patience. Spend the hour.

Older engineers used to call this learning. Copy-pasting from
Stack Overflow used to require reading three wrong answers to
find the right one, and the wrong answers were the education. The
model skips the wrong answers and hands you something that looks
like the right one, which feels like a gift and is actually a tax
on understanding. The hour you used to spend reading wrong
answers was the hour you learned what right looked like. The
seniors you'll be measured against in five years are the juniors
who are paying that tax now, on purpose, when they don't have
to.

## If you've been doing this a while

For the senior who has watched the slop and decided the whole
thing is beneath them, the instinct is half right and the
conclusion is wrong. The slop is real. You won't be left behind
on any timescale that should worry you. But the reason to engage
is more interesting than not getting left behind.

Used carefully, AI is good at the thing serious engineers are
already trying to do, which is build systems that don't fall
over. The reframe that makes this work is to stop treating the
tool as an accelerator. Treating it as an accelerator is what
produces the slop you correctly object to. Treat it as a
robustness multiplier instead, and most of the rest follows.

Not all code carries equal weight, and it's worth saying that
explicitly before going further. A throwaway script, a one-off
migration, a prototype you're going to delete in a week, an
internal tool with three users, the scaffolding around a real
feature, for code like this the theory genuinely doesn't matter
much, and the time saved is real. Use the tool freely. The
discipline this article is arguing for is for the code that
lives. Most engineers, on most days, are working on code that
lives. But not all code. Know which one you're writing.

For the code that lives, this means using the tool before the
code more than during it. Have it argue against your design
before you've written a line. Ask it to enumerate failure modes.
Ask it what a hostile reviewer would say. The cost of a bad idea
caught at the whiteboard is zero. The cost caught in production
is the rest of your week.

What it should not do is generate the load-bearing logic that you
then squint at and approve. That is where the cognitive debt
accrues fastest. Auth, payments, migrations, anything that
touches money or identity or data integrity, those are places
where the model can explain a library to you but should not be
writing the handler. If you wouldn't let a stranger commit
directly to those paths, don't let the model either. The model
is, functionally, a stranger with confident opinions and no stake
in whether they're right.

## A second pair of eyes

The use I keep coming back to is the model as a second pair of
eyes on code I already wrote.

You spend three days on a feature. The PR is 2,000 lines. You've
read it so many times the words have stopped meaning anything.
Your colleagues are going to review it with the same human eyes
you have, on a Tuesday afternoon, between meetings, and they are
going to miss things. Not because they're bad at their jobs.
Because humans are bad at spotting needles in haystacks, and a
2,000 line diff is a haystack.

The model is genuinely good at that. Not at thinking. At
noticing. The off-by-one in the loop you refactored at midnight.
The error path that returns the wrong type in one of the six
places it's handled. The variable you renamed everywhere except
in the log line. The test that passes for the wrong reason.

It is also wrong a lot. It will flag a non-bug with the same
confidence it flags a real one, and if you take its word for it
you'll fix the non-bug and create a real one in the process. The
value isn't in trusting what it says. The value is in being told
where to look. The model points at fifteen things in your diff.
Five are real, eight are misreadings of code that's fine, two are
stylistic preferences dressed up as bugs. Your job is to do the
actual review on the fifteen places it pointed at, which is
fifteen places you wouldn't otherwise have looked at on a fourth
reading.

That is the use that compounds. The code is yours. The theory is
yours. The model is the linter you couldn't write, the reviewer
with infinite time and unreliable judgment, the second look
before the first human ever sees it.

## The cost

The cost of having that available is real, and worth naming on
its own.

The model is right there. The deadline is right there. The
function is boring. The temptation to hand the next one over
instead of writing it yourself is constant, and it doesn't go
away with experience or with better tooling. No amount of prompt
engineering saves you from it.

The temptation isn't always pressure. Sometimes it's pleasure.
The model can be good company. The work flows. You feel
productive in a way you haven't felt in years, and the feeling is
real, and it's the same feeling METR's developers had when they
were measurably slower than they thought. The enjoyment is
honest. The conclusions you draw from it aren't.

The engineers who get the most out of these tools over a career
are the ones who keep the tool in its actual lane, day after day.
The ones who don't end up shipping code they didn't write, didn't
read, and can't maintain, which is the failure mode this whole
article has been about.

Refusing to use the tool at all, costs you the second pair of
eyes. Using it without discipline costs you the theory. The
narrow path between those is where the work actually is.

## Before you merge

The heuristic that ties this together is one question, asked
before every merge. If the AI vanished tomorrow, could you
maintain this code? If the answer is no, the code is not ready,
regardless of whether the tests pass. Tests pass on a lot of
things that go on to ruin weekends.

Build the supervision into artifacts so it doesn't all have to
live in your head. Strong types catch what tired reviewers miss.
Tests pin behavior the model might quietly change next week. Keep
a running log of the mistakes the model makes in your codebase,
because it makes the same ones repeatedly, and the log becomes a
prompt, and the prompt becomes a guardrail. Risk-tier your
reviews. A CSS tweak gets a glance. A change to the auth
middleware gets the full archaeology. The model's involvement
scales inversely with the tier.

None of this is anti-AI. I use these tools every day. I'm
writing this with one open in another window, catching my
grammatical mistakes. It's good at that, mostly. It would be
worse at the thinking, so I'm not asking it to do that part.

The job was never typing. The job was building a correct theory
of a system that does something useful and doesn't fall over on
a Saturday night. The code is the receipt. The theory is the
product.

> Write 20% of the code. Write all of it. The percentage doesn't
> matter and arguing about it is a distraction. Do 100% of the
> thinking. That part was never negotiable.

<p id="footnote-1" class="article-meta">
[*] This is a simplification and I know it. Sometimes the typing
genuinely is the bottleneck. Sometimes you know exactly what you
want and you just need to get it on the page, and the model is
great for that. The line is meant in the aggregate, across a
career. Across a career, the time you spend understanding code
dwarfs the time you spend typing it, and any tool that optimizes
the typing without also optimizing the understanding is solving
the smaller problem.
</p>

## References

- Peter Naur, *Programming as Theory Building*, 1985.
- METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*, 2025.
- Anthropic, research on skill formation and AI tool usage patterns, 2025.
- GitClear, AI Copilot Code Quality annual reports, 2024 and 2025.
- Apiiro, research on AI-assisted code security, 2025.
- CodeRabbit, internal analyses of AI-assisted PR defect rates, 2025.
- Lars Faye, *Agentic Coding Is a Trap*.
- Addy Osmani, writing on comprehension debt and the 70% problem.
