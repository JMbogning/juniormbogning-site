const RECIPIENT_EMAIL = 'contact@juniormbogning.com';
const MIN_FILL_TIME_MS = 4000;

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const name = sanitizeText(params.name);
    const email = sanitizeText(params.email);
    const subject = sanitizeText(params.subject);
    const message = sanitizeText(params.message);
    const website = sanitizeText(params.website);
    const antiBotAnswer = sanitizeText(params.antiBotAnswer);
    const antiBotLeft = Number(params.antiBotLeft || 0);
    const antiBotOperator = sanitizeText(params.antiBotOperator);
    const antiBotRight = Number(params.antiBotRight || 0);
    const locale = sanitizeText(params.locale) || 'fr';
    const page = sanitizeText(params.page);
    const elapsedMs = Number(params.elapsedMs || 0);

    if (website) {
      return jsonResponse({ ok: true, ignored: true });
    }

    if (
      !Number.isFinite(antiBotLeft) ||
      !Number.isFinite(antiBotRight) ||
      !['+', '-'].includes(antiBotOperator) ||
      antiBotAnswer !== String(computeChallengeResult(antiBotLeft, antiBotOperator, antiBotRight))
    ) {
      return jsonResponse({ ok: false, error: 'invalid_challenge' });
    }

    if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_TIME_MS) {
      return jsonResponse({ ok: false, error: 'too_fast' });
    }

    if (!name || !email || !subject || !message) {
      return jsonResponse({ ok: false, error: 'missing_fields' });
    }

    const safeSubject = `[Site] ${subject}`;
    const body = [
      `Nom / Name: ${name}`,
      `Email: ${email}`,
      `Langue / Locale: ${locale}`,
      page ? `Page: ${page}` : '',
      '',
      message
    ]
      .filter(Boolean)
      .join('\n');

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: safeSubject,
      body: body,
      name: 'Junior Mbogning Website'
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : 'unknown_error'
    });
  }
}

function sanitizeText(value) {
  return String(value || '').trim();
}

function computeChallengeResult(left, operator, right) {
  if (operator === '+') {
    return left + right;
  }

  if (operator === '-') {
    return left - right;
  }

  throw new Error('unsupported_operator');
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}